# Concepts

Various concepts in `condenser`.

---

## Universe

The universe is a representation of the world upon which we are acting through a series of utterances. Evolution of the universe is represented as a finite state machine where each utterance evolves the machine to its next state.

## Processor

A processor is a pipeline through which we reduce an utterance into an action that modifies the state of the universe. 

## Graph

## Token

## Transformer

A transformer takes a series of tokens and transforms them. Transformation may entail changing a token's type, annotating tokens with additional information, or combining multiple tokens into one. 

Generally, transforms will map one token space into another token space. Suppose our universe, `U`, contains tokens `{A, B, C, D}`. Also, suppose we have a token spaces `X = {A, B}` and `Y = {C, D}`. Then we could define a transform `T: X -> Y` which will map elements from types `{A, B}` to types `{C, D}`.



## Condenser

## Parser