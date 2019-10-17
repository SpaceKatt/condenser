import { v4 as uuid } from 'uuid';

function* generateTokenId(): IterableIterator<string> {
    yield uuid();
}



