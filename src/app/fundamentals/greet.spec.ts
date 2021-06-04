import { greet } from './greet';

// testing arrays and string

describe('greet', () => {

    it('should include the name in the message', () => {
        const result = greet('pk');
        expect(result).toBe('Welcome pk');  // more fragile
        expect(result).toContain('pk');
    });
});