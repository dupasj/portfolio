import EventCall from "./call";

class EventStack{
  event_managers = [];
  runner = undefined;
  name = undefined;
  expiration_date = undefined;
  maximum_call = undefined;
  tags = [];
  calls = [];

  static from(from) {
    if (from instanceof EventStack){
      return from;
    }

    return this.fromRunner(from);
  }

  static maximum(from, maximum) {
    const result = this.from(from);

    result.setMaximumCall(maximum);

    return result;
  }

  static next(from) {
    return this.maximum(from,1);
  }

  static once(from) {
    return this.maximum(from,1);
  }

  static fromRunner(funct) {
    return (new this).setFunction(funct);
  }

  setAvailableCall(call = 1) {
    this.setMaximumCall(this.countCalled() + call);

    return this;
  }

  addCall(call) {
    if (Array.isArray(call)){
      for(const item of call){
        this.addCall(item);
      }

      return this;
    }

    if (this.hasCall(call)){
      return this;
    }

    this.calls.push(call);
    call.addStack(this);

    return this;
  }

  removeCall(call) {
    if (Array.isArray(call)){
      for(const item of call){
        this.removeCall(item);
      }

      return this;
    }

    while(true){
      const index = this.calls.indexOf(call);
      if (index < 0){
        break;
      }

      this.calls.slice(index,1);
      call.removeStack(this);
    }

    return this;
  }

  getCalls() {
    return this.calls;
  }

  getExecutedCalls(){
    return this.getCalls().filter(call => call.hasBeenCalled());
  }

  hasCall(call) {
    return this.getCalls().indexOf(call) >= 0;
  }

  run(call) {
    if (this.hasRunner()){
      if (typeof call === "undefined"){
        const e = new EventCall();
        e.addStack(this);
        e.run();

        return this;
      }

      (this.getRunner())(... call.getParameters());
    }

    return this;
  }

  bind(runner) {
    return this.setFunction(runner);
  }

  setFunction(runner) {
    if (this.runner === runner){
      return this;
    }

    this.removeRunner();
    this.runner = runner;

    return this;
  }

  hasRunner() {
    return typeof this.runner !== "undefined";
  }

  getRunner() {
    if (!this.hasRunner()){
      throw new Error();
    }

    return this.runner;
  }

  removeRunner() {
    this.runner = undefined;

    return this;
  }

  getMaximumCall() {
    if (!this.hasMaximumCall()){
      throw new Error();
    }

    return this.maximum_call;
  }

  hasMaximumCall() {
    return this.maximum_call !== null;
  }

  setMaximumCall(maximum_call) {
    if (this.maximum_call === maximum_call){
      return this;
    }

    this.removeMaximumCall();
    this.maximum_call = maximum_call;

    return this;
  }

  removeMaximumCall() {
    this.maximum_call = undefined;

    return this;
  }

  getExpirationDate() {
    if (!this.hasExpirationDate()){
      throw new Error();
    }

    return this.expiration_date;
  }

  hasExpirationDate() {
    return typeof this.expiration_date !== "undefined";
  }

  setExpirationDate(expiration_date) {
    if (this.expiration_date === expiration_date){
      return this;
    }

    this.removeExpirationDate();
    this.expiration_date = expiration_date;

    return this;
  }

  removeExpirationDate() {
    this.expiration_date = undefined;

    return this;
  }

  getName() {
    if (!this.hasName()){
      throw new Error();
    }

    return this.name;
  }

  hasName() {
    return typeof this.name !== "undefined";
  }

  setName(name) {
    if (this.name === name){
      return this;
    }

    for(const manager of this.getEventGestures()){
      if (manager.hasStackName(name)){
        throw new Error();
      }
    }

    this.removeName();
    this.name = name;

    return this;
  }

  removeName() {
    this.name = undefined;

    return this;
  }

  addEventGesture(event_manager) {
    if (Array.isArray(event_manager)){
      for(const item of event_manager){
        this.addEventGesture(item);
      }

      return this;
    }

    if (this.hasEventGesture(event_manager)){
      return this;
    }

    this.event_managers.push(event_manager);
    event_manager.addStack(this);

    return this;
  }

  getEventGestures() {
    return this.event_managers;
  }

  hasEventGesture(event_manager){
    return this.getEventGestures().indexOf(event_manager) >= 0;
  }

  addTag(tag) {
    if (Array.isArray(tag)){
      for(const item of tag){
        this.addTag(item);
      }

      return this;
    }

    if (this.hasTag(tag)){
      return this;
    }

    this.tags.push(tag);

    return this;
  }

  getTags() {
    return this.tags;
  }

  removeTag(tag) {
    if (Array.isArray(tag)){
      for(const item of tag){
        this.removeTag(item);
      }

      return this;
    }

    while(true){
      const index = this.tags.indexOf(tag);
      if (index >= 0){
        this.tags.slice(index,1);
      }else{
        break;
      }
    }

    return this;
  }

  hasTag(tag) {
    return this.getTags().indexOf(tag) >= 0;
  }

  countCalled() {
    return this.getCalls().length;
  }

  isAlive(date = performance.now()) {
    if (this.hasMaximumCall() && this.getMaximumCall() > this.countCalled()){
      return false;
    }

    if (this.hasExpirationDate() && this.getExpirationDate() < date){
      return false;
    }

    return true;
  }
}

export default EventStack;
