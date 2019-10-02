
export interface Condenser {};
export interface Parser {};
export interface Processor {};
export interface Transformer {};

export interface ProcessorBuilder {
    condense(condenser: Condenser): ProcessorBuilder;
    parse(parser: Parser): Processor;
    transform(transformer: Transformer): ProcessorBuilder;
};
