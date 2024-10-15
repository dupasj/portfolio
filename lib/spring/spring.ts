import SpringEngine from "./spring-engine";
import SpringParameter from "./spring-parameter";

export class Spring extends SpringEngine<number> {
    
    __parameter = new SpringParameter();

    constructor(stiffness: number,damping: number,mass: number) {
        super();

        this.setStiffness(stiffness);
        this.setDamping(damping);
        this.setMass(mass);
    }
    
    
    getVelocity (time = this.getTime()): number {
        return this.__getVelocity(time);
    }

    __add (a: number, b: number): number {
        return a + b;
    }
    
    __identity (): number {
        return 0;
    }
    __configureSpringTo (target: number, from: number, withVelocity: number): this {
        this.__parameter.springTo(target,from,withVelocity);

        return this;
    }

    __computeVelocity (time: number): number {
        return this.__parameter.getVelocity(time);
    }
    __computePosition (time: number): number {
        return this.__parameter.getPosition(time);
    }
    __computeDistanceThreshold (a: number, b: number): number {
        return Math.abs(a - b);
    }

    getTarget (): number {
        return this.__parameter.getTarget();
    }
    __assignTarget (target: number): this {
        this.__parameter.setTarget(target);
        return this;
    }
    getMass (): number {
        return this.__parameter.getMass();
    }
    __assignMass (mass: number,time: number|null): this {
        this.__parameter.setMass(mass,time);
        return this;
    }
    getStiffness (): number {
        return this.__parameter.getStiffness();
    }
    __assignStiffness (stiffness: number,time: number|null): this {
        this.__parameter.setStiffness(stiffness,time);
        return this;
    }
    getDamping (): number {
        return this.__parameter.getDamping();
    }
    __assignDamping (damping: number,time: number|null): this {
        this.__parameter.setDamping(damping,time);
        return this;
    }
}

export default Spring;