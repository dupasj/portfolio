import SPRING_DEFAULT_STIFFNESS from "./contants/spring-default-stiffness";
import SPRING_DEFAULT_DAMPING from "./contants/spring-default-damping";
import SPRING_DEFAULT_MASS from "./contants/spring-default-mass";

export class SpringParameter {
    protected __damping: number;
    protected __stiffness: number;
    protected __mass: number;
    protected __initial_velocity = 0;
    protected __initial_position = 0;
    protected __target = 0;

    constructor (stiffness: number = SPRING_DEFAULT_STIFFNESS, damping: number = SPRING_DEFAULT_DAMPING, mass: number = SPRING_DEFAULT_MASS) {
        this.__stiffness = stiffness;
        this.__damping = damping;
        this.__mass = mass;
    }


    springTo (target: number, from: number, withVelocity: number): this {
        this.__initial_position = from;
        this.__initial_velocity = withVelocity;
        this.__target = target;

        return this;
    }

    setTarget (target: number): this {
        this.__target = target;

        return this;
    }

    getTarget (): number {
        return this.__target;
    }

    freezeTo (position: number, pulse = 0): this {
        this.springTo(position,pulse,position);

        return this;
    }

    setVelocity (velocity: number, position: number): this {
        return this.springTo(this.getTarget(),velocity,position);
    }

    getPosition (time: number): number {
        const distance = this.__initial_position - this.__target;
        const cmk = this.__damping * this.__damping - 4 * this.__mass * this.__stiffness;

        if (cmk === 0) {
            if (distance === 0) {
                return this.__target;
            }

            const r = -this.__damping / (2.0 * this.__mass);
            const c1 = distance;
            const c2 = this.__initial_velocity / (r * distance);

            return this.__target + (c1 + c2 * time) * Math.pow(Math.E, r * time);
        }

        if (cmk > 0) {
            const r1 = (-this.__damping - Math.sqrt(cmk)) / (2.0 * this.__mass);
            const r2 = (-this.__damping + Math.sqrt(cmk)) / (2.0 * this.__mass);
            const c2 = (this.__initial_velocity - r1 * distance) / (r2 - r1);
            const c1 = distance - c2;

            return this.__target + c1 * Math.pow(Math.E, r1 * time) + c2 * Math.pow(Math.E, r2 * time);
        }

        const w = Math.sqrt(4.0 * this.__mass * this.__stiffness - this.__damping * this.__damping) / (2.0 * this.__mass);
        const r = -(this.__damping / 2.0 * this.__mass);
        const c1 = distance;
        const c2 = (this.__initial_velocity - r * distance) / w;

        return this.__target + Math.pow(Math.E, r * time) * (c1 * Math.cos(w * time) + c2 * Math.sin(w * time));
    }

    getVelocity (time: number): number {
        const distance = this.__initial_position - this.__target;
        const cmk = this.__damping * this.__damping - 4 * this.__mass * this.__stiffness;

        if (cmk === 0) {
            if (distance === 0) {
                return 0;
            }

            const r = -this.__damping / (2.0 * this.__mass);
            const c1 = distance;
            const c2 = this.__initial_velocity / (r * distance);

            const power = Math.pow(Math.E, r * time);
            return r * (c1 + c2 * time) * power + c2 * power;
        }

        if (cmk > 0) {
            const r1 = (-this.__damping - Math.sqrt(cmk)) / (2.0 * this.__mass);
            const r2 = (-this.__damping + Math.sqrt(cmk)) / (2.0 * this.__mass);
            const c2 = (this.__initial_velocity - r1 * distance) / (r2 - r1);
            const c1 = distance - c2;

            return c1 * r1 * Math.pow(Math.E, r1 * time) + c2 * r2 * Math.pow(Math.E, r2 * time);
        }

        const w = Math.sqrt(4.0 * this.__mass * this.__stiffness - this.__damping * this.__damping) / (2.0 * this.__mass);
        const r = -(this.__damping / 2.0 * this.__mass);
        const c1 = distance;
        const c2 = (this.__initial_velocity - r * distance) / w;

        const power = Math.pow(Math.E, r * time);
        const cosine = Math.cos(w * time);
        const sine = Math.sin(w * time);

        return power * (c2 * w * cosine - c1 * w * sine) + r * power * (c2 * sine + c1 * cosine);
    }

    getMass (): number {
        return this.__mass;
    }

    setMass (mass: number,time: number|null): this {
        if (this.getMass() === mass) {
            return this;
        }

        if (time === null) {
            this.__mass = mass;
            return this;
        }

        const velocity = this.getVelocity(time);
        const position = this.getPosition(time);

        this.__mass = mass;

        this.springTo(this.getTarget(),velocity,position);

        return this;
    }

    getDamping (): number {
        return this.__damping;
    }

    setDamping (damping: number,time: number|null): this {
        if (this.getDamping() === damping) {
            return this;
        }

        if (time === null) {
            this.__damping = damping;
            return this;
        }

        const velocity = this.getVelocity(time);
        const position = this.getPosition(time);

        this.__damping = damping;

        this.springTo(this.getTarget(),velocity,position);

        return this;
    }

    getStiffness (): number {
        return this.__stiffness;
    }

    setStiffness (stiffness: number,time: number|null): this {
        if (this.getStiffness() === stiffness) {
            return this;
        }
        
        if (time === null) {
            this.__stiffness = stiffness;
            return this;
        }

        const velocity = this.getVelocity(time);
        const position = this.getPosition(time);

        this.__stiffness = stiffness;

        this.springTo(this.getTarget(),velocity,position);

        return this;
    }

    getConfiguration (): {damping: number;mass: number;stiffness: number} {
        return {
            damping: this.getDamping(),
            mass: this.getMass(),
            stiffness: this.getStiffness(),
        };
    }

    apply (configuration: SpringParameter | ((spring: this) => void) | {damping?: number;mass?: number;stiffness?: number},time: number|null): this {
        if (typeof time === "number") {
            const velocity = this.getVelocity(time);
            const position = this.getPosition(time);
            
            this.apply(configuration,null);
            
            this.springTo(this.getTarget(),position,velocity);
            
            return this;
        }

        if (configuration instanceof SpringParameter) {
            return this.apply(configuration.getConfiguration(),time);
        }

        if (typeof configuration === "function") {
            configuration(this);
            return this;
        }

        if ("damping" in configuration && typeof configuration.damping === "number") {
            this.setDamping(configuration.damping,time);
        }
        if ("mass" in configuration && typeof configuration.mass === "number") {
            this.setMass(configuration.mass,time);
        }
        if ("stiffness" in configuration && typeof configuration.stiffness === "number") {
            this.setStiffness(configuration.stiffness,time);
        }

        return this;
    }
    
    isSame (configuration: SpringParameter | {damping?: number;mass?: number;stiffness?: number}): boolean {
        if (configuration instanceof SpringParameter) {
            return this.isSame(configuration.getConfiguration());
        }

        if ("damping" in configuration && configuration.damping !== this.__damping) {
            return false;
        }
        if ("mass" in configuration && configuration.mass !== this.__mass) {
            return false;
        }
        if ("stiffness" in configuration && configuration.stiffness !== this.__stiffness) {
            return false;
        }
        
        return true;
    }
}

export default SpringParameter;