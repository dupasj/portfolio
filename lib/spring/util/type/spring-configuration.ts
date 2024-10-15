import type { SpringBaseConfiguration } from "./spring-base-configuration";

export interface SpringConfiguration<Type> extends SpringBaseConfiguration<Type> {
    velocity_tolerance: number;
    distance_tolerance: number;
}

export default SpringConfiguration;