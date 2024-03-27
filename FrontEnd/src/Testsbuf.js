import { expect } from 'chai';
import Eval from './Evaluator.js'; 
const e=new Eval();
describe('Evaluator', () => {
    it('should add two numbers correctly', () => {
        
        const result = e.evalulator("1+2");
        expect(result).to.equal(3); 
    });

    it('should subtract two numbers correctly', () => {

        const result = e.evalulator("5-2");
        expect(result).to.equal(3); 
    });
    it('should evaluate sin(30) correctly', () => {
        const result = e.evalulator("sin(30)");
        expect(result).to.be.closeTo(0.5, 0.0001); // Close enough to 0.5
    });

    it('should evaluate cos(45) correctly', () => {
        const result = e.evalulator("cos(45)");
        expect(result).to.be.closeTo(0.7071, 0.0001); // Close enough to 0.7071
    });

    it('should evaluate tan(60) correctly', () => {
        const result = e.evalulator("tan(60)");
        expect(result).to.be.closeTo(1.7320, 0.001); // Close enough to 1.732
    });
    it('should throw an error for invalid expression', () => {
        expect(() => {
            e.evalulator("sin(abc)");
        }).to.throw(Error);
    });

    // Test case with non-equal output
    it('should fail for non-equal output', () => {
        const result = e.evalulator("1+2");
        expect(result).not.to.equal(5); 
    });
    
});
