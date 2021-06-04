import { greet } from "./greet";

// testing arrays and string
describe('greet', () => {
    it('should include the name in the message', () => {
        
        expect(greet('pk')).toBe('Welcome pk')  // more fragile
        // expect(greet('pkay')).toContain('pkay')
    })
})