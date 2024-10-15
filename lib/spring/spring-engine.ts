import nearZero from "~/lib/util/near-zero";
import SPRING_DEFAULT_VELOCITY_TOLERANCE from "~/lib/spring/contants/spring-default-velocity-tolerence";
import SPRING_DEFAULT_DISTANCE_TOLERANCE from "~/lib/spring/contants/spring-default-distance-tolerence";

export abstract class SpringEngine<Type extends number> {
    protected __velocity_tolerance: number = SPRING_DEFAULT_DISTANCE_TOLERANCE;
    protected __distance_tolerance: number = SPRING_DEFAULT_VELOCITY_TOLERANCE;
    protected __time = 0;
    
    addVelocity (velocity: Type, finish?: (number | ((spring: this) => void)), time = this.getTime()): this {
        if (typeof finish === "number") {
            return this.addVelocity(velocity,() => {},time);
        }
        const newVelocity = this.__add(velocity,this.__getVelocity(time));
        this.springTo(this.getTarget(),newVelocity);
        return this;
    }



    springTo(target: Type): this
    springTo(target: Type, velocity?: Type | null | undefined): this
    springTo(target: Type, velocity?: Type | null | undefined, position?: Type | null | undefined): this

    springTo (target: Type, velocity?: Type | null | undefined, position?: Type  | null | undefined): this {
        const __position = typeof position === "function" || typeof position === "undefined" || position === null ? this.getPosition() : position;
        const __velocity = typeof velocity === "function" || typeof velocity === "undefined" || velocity === null ? this.__getVelocity() : velocity;

        if (this.__computeDistanceThreshold(__position,target) <= this.getDistanceTolerance() && this.__computeDistanceThreshold(this.__identity(),__velocity) <= this.getVelocityTolerance()) {
            this.__configureSpringTo(target,__position,this.__identity());
            this.__time = 0;

            return this;
        }

        this.__configureSpringTo(target,__position,__velocity);
        this.__time = 0;

        return this;
    }

    setDamping (damping: Type): this {
        if (this.__computeDistanceThreshold(this.getDamping(),damping) === 0) {
            return this;
        }

        this.__assignDamping(damping,this.getTime());

        return this;
    }

    setStiffness (stiffness: Type): this {
        if (this.__computeDistanceThreshold(this.getStiffness(),stiffness) === 0) {
            return this;
        }

        this.__assignStiffness(stiffness,this.getTime());

        return this;
    }

    setMass (mass: Type): this {
        if (this.__computeDistanceThreshold(this.getStiffness(),mass) === 0) {
            return this;
        }

        this.__assignMass(mass,this.getTime());

        return this;
    }

    setVelocityTolerance (tolerance: number): this {
        this.__velocity_tolerance = tolerance;

        return this;
    }

    getVelocityTolerance (): number {
        return this.__velocity_tolerance;
    }

    setDistanceTolerance (tolerance: number): this {
        this.__distance_tolerance = tolerance;

        return this;
    }

    /**
     * @return {number}
     */
    getDistanceTolerance (): number {
        return this.__distance_tolerance;
    }

    getTime (): number {
        return this.__time;
    }

    getPosition (time = this.getTime()): Type {
        if (this.isDone(time)) {
            return this.getTarget();
        }
        return this.__computePosition(time);
    }

    __getVelocity (time = this.getTime()): Type {
        if (this.isDone(time)) {
            return this.__identity();
        }

        return this.__computeVelocity(time);
    }

    isDone (time = this.getTime()): boolean {
        return nearZero(this.__computeDistanceThreshold(this.getTarget(),this.__computePosition(time)),this.getDistanceTolerance()) && nearZero(this.__computeDistanceThreshold(this.__computeVelocity(time),this.__identity()),this.getVelocityTolerance());
    }

    /**
     * **Advances the current [spring engine](SpringEngine) instance by a specified time delta** or the elapsed time since the last tick. *It allows you to control the progression and trigger events based on the time passed.*.
     * @param {any} [delta=getDeltaTime()] **The time delta to advance the animation by**. The `delta` parameter represents the time increment by which the animation should progress. It is typically expressed in seconds. If `delta` is not provided, the method defaults to using the result of `getDeltaTime()`, which can calculate the time difference between ticks.
     * @return {this}
     */
    tick (delta: number): this {
        this.__time += delta;

        if (this.isDone()) {
            return this;
        }

        return this;
    }

    freezeTo(position: Type): this
    freezeTo(position: Type, pulse?: Type | null | undefined): this
    /**
     * @param {Type} position
     * @param {Type | ((spring: this) => void) | null | undefined=} pulse
     * @param {((spring: this) => void)=} finish
     * @return {this}
     */
    freezeTo (position: Type, pulse?: Type | null | undefined): this {
        const __pulse = typeof pulse === "function" || typeof pulse === "undefined" || pulse === null ? this.__identity() : pulse;

        this.springTo(position,__pulse,position);

        return this;
    }

    abstract __computeVelocity(time: number): Type
    abstract __computePosition(time: number): Type
    abstract __computeDistanceThreshold(a: Type, b: Type): number
    abstract __add(a: Type, b: Type): Type
    abstract getTarget(): Type
    abstract __assignTarget(target: Type): this

    abstract getMass(): Type
    abstract __assignMass(target: Type,time: number|null): this

    abstract getStiffness(): Type
    abstract __assignStiffness(target: Type,time: number|null): this

    abstract getDamping(): Type
    abstract __assignDamping(target: Type,time: number|null): this
    abstract __identity(): Type
    abstract __configureSpringTo(target: Type,from: Type,withVelocity: Type): this;
}

export default SpringEngine;