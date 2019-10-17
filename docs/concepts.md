- [Concepts](#concepts)
  - [Universe](#universe)
  - [Processor](#processor)
  - [Token](#token)
    - [Raw token](#raw-token)
    - [Entity token](#entity-token)
    - [Intentity token](#intentity-token)
    - [Higher-order token](#higher-order-token)
  - [Graph](#graph)
  - [Transformer](#transformer)
  - [Condenser](#condenser)
  - [Parser](#parser)

---

# Concepts

Various concepts in `condenser`.

## Universe

The universe is a representation of the world upon which we are acting through a series of utterances. Evolution of the universe is represented as a finite state machine where each utterance evolves the machine to its next state.

## Processor

A processor is a pipeline through which we reduce an utterance into an action that modifies the state of the universe. 

## Token

There are several types of tokens which contribute to `condenser`.

### Raw token

Raw tokens are input to the system. Input is usually in the form of words, however it is conceivable to have phonemes or other objects as input.

### Entity token

Entity tokens have domain specific information associated with them. Definition of the domain comes from the universe and the context of the problem that is being solved.

### Intentity token

Intentity tokens represent the intent of an utterance. For example, "add" may be an intentity representing the addition of another entity token to the model of our universe.

### Higher-order token

Higher-order tokens are aggregations of tokens. Groupings may include combinations of raw, entity, intentity, and other higher-order tokens. 

## Graph

Tokens represent nodes in a graph and are strung together into higher-order tokens by walking over the graph's edges. Most operations in `condenser` act upon the graph to discover what the meaning of an utterance is.

## Transformer

A transformer takes a series of tokens and transforms them. Transformation may entail changing a token's type, annotating tokens with additional information, or combining multiple tokens into one. 

Generally, transforms will map one token space into another token space. Suppose our universe, `U`, contains tokens `{A, B, C, D}`. Also, suppose we have a token spaces `X = {A, B}` and `Y = {C, D}`. Then we could define a transform `T: X -> Y` which will map elements from types `{A, B}` to types `{C, D}`. It is worth noting that transforms may map a space to itself or a superset of itself; the domain and codomain of a transform need not be mutually exclusive.

Use of transformers involves performing search over tokens for entities with semantics within the domain of our universe. How search is performed and how tokens are mapped from one space to another depends on the needs of the user and the context.

## Condenser

A condenser finds relations among tokens and groups them into higher-order tokens.

## Parser

A parser takes a series of higher-order tokens and uses them to cause change to the universe.