import { compute } from './compute';

// testing integer value return type

// component system under test is "Compute"
describe('Compute', () => {
    // after "should" is a verb
    it('should return 0 if input is negative', () => {
        const res = compute(-1);
        expect(res).toBe(0);
    });
});