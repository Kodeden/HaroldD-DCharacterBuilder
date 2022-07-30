import { render, screen, fireEvent, act } from "@testing-library/react";
import Stats from "./Stats";

describe("The default values for race and stats appear onscreen", () => {

    it("race", () => {
        render(<Stats />);
        const input = screen.getByTestId("race");
        expect(input.value).toBe("Human");
    });

    it("strength", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawstr");
        expect(input.value).toBe("8");
    });
    
    it("dexterity", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawdex");
        expect(input.value).toBe("8");
    });

    it("constitution", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawcon");
        expect(input.value).toBe("8");
    });
    
    it("intelligence", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawint");
        expect(input.value).toBe("8");
    });
    
    it("wisdom", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawwis");
        expect(input.value).toBe("8");
    });
    
    it("charisma", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawcha");
        expect(input.value).toBe("8");
    });
});

describe("The errors for stats appear onscreen as appropriate", () => {

    it("The errors appear when a stat exceeds 18", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawstr");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        const errorOutput = screen.getByTestId("strerror");
    });

});