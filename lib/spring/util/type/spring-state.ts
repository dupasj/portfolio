import type { SpringBaseConfiguration } from "./spring-base-configuration";

export interface SpringState<Type> extends SpringBaseConfiguration<Type> {
    velocity: Type;
    position: Type;
    target: Type;
    time: number;
}

export default SpringState;