import EventStack from "./stack";
import EventCall from "./call";

class EventManager{
  stacks = [];

  addStack(stack) {
    if (Array.isArray(stack)){
      for(const item of stack){
        this.addStack(item);
      }

      return this;
    }

    const from = EventStack.from(stack);
    if (from !== stack){
      return this.addStack(from);
    }

    if (this.hasStack(stack)){
      return this;
    }

    if (stack.hasName() && this.hasStackName(stack.getName())){
      throw new Error();
    }

    this.stacks.push(stack);
    stack.addEventGesture(this);

    return this;
  }

  getStacks() {
    return this.stacks;
  }

  removeStack(stack) {
    if (Array.isArray(stack)){
      for(const item of stack){
        this.removeStack(item);
      }

      return this;
    }

    if (typeof stack === "function"){
      return this.removeStack(this.getStacks().filter(item => {
        return item.hasRunner() && item.getRunner() === stack
      }));
    }

    while(true){
      const index = this.stacks.indexOf(stack);
      if (index >= 0){
        this.stacks.splice(index,1);
      }else{
        break;
      }
    }

    return this;
  }

  hasStack(stack) {
    return this.getStacks().indexOf(stack) >= 0;
  }

  getStackByName(name) {
    for(const stack of this.getStacks()){
      if (stack.hasName() && stack.getName() === name){
        return stack;
      }
    }

    throw new Error();
  }

  hasStackName(name) {
    for(const stack of this.getStacks()){
      if (stack.hasName() && stack.getName() === name){
        return true;
      }
    }

    return false;
  }

  getStacksByTags(tag) {
    if (!Array.isArray(tag)){
      return this.getStacksByTags([tag]);
    }

    const result = [];
    for(const stack of this.getStacks()){
      for(const item of tag){
        if (stack.getTags().indexOf(item) >= 0 && result.indexOf(stack) < 0){
          result.push(stack);
          break;
        }
      }
    }

    return result;
  }

  caller(arg) {
    const call = new EventCall();

    call.addStack(this.getStacks());
    call.setEventManager(this);
    call.setParameters(arg);

    return call;
  }

  nameCaller(name,arg) {
    const call = new EventCall();

    if (this.hasStackName(name)){
      call.addStack(this.getStackByName(name));
    }
    call.setEventManager(this);
    call.setParameters(arg);

    return call;
  }

  tagsCaller(tags,arg) {
    const call = new EventCall();

    call.addStack(this.getStacksByTags(tags));
    call.setEventManager(this);
    call.setParameters(arg);

    return call;
  }

  run(arg) {
    this.caller(arg).run();

    return this;
  }

  runName(name,arg) {
    this.nameCaller(name,arg).run();

    return this;
  }

  runTags(tags,arg) {
    this.tagsCaller(tags,arg).run();

    return this;
  }

  truncate() {
    this.removeStack(this.getStacks());

    return this;
  }
}

export default EventManager;
