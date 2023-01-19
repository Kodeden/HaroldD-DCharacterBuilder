import { render, screen, fireEvent, act } from "@testing-library/react";
import Stats from "../components/Stats";

describe("The default values for race and stats appear onscreen", () => {

    it("race", () => {
        render(<Stats />);
        const input = screen.getByTestId("race");
        expect(input.value).toBe("Human (non-variant)");
    });

    it("strength", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawstr");
        expect(input.value).toBe("8");
        const output = screen.getByTestId("str");
        expect(output.value).toBe("9");
    });
    
    it("dexterity", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawdex");
        expect(input.value).toBe("8");
        const output = screen.getByTestId("dex");
        expect(output.value).toBe("9");
    });

    it("constitution", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawcon");
        expect(input.value).toBe("8");
        const output = screen.getByTestId("con");
        expect(output.value).toBe("9");
    });
    
    it("intelligence", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawint");
        expect(input.value).toBe("8");
        const output = screen.getByTestId("int");
        expect(output.value).toBe("9");
    });
    
    it("wisdom", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawwis");
        expect(input.value).toBe("8");
        const output = screen.getByTestId("wis");
        expect(output.value).toBe("9");
    });
    
    it("charisma", () => {
        render(<Stats />);
        const input = screen.getByTestId("rawcha");
        expect(input.value).toBe("8");
        const output = screen.getByTestId("cha");
        expect(output.value).toBe("9");
    });
});

describe("The errors for stats appear onscreen as appropriate", () => {

    it("The errors appear when a stat exceeds 18", async () => {
        render(<Stats />);
        let input = screen.getByTestId("rawstr");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        let errorOutput = await screen.findByTestId("strerror");
        expect(errorOutput).toBeTruthy();
    });

}); 

describe("The errors for stats appear onscreen as appropriate", () => {

    it("The error appears when str exceeds 18 or is below 3", async () => {
        render(<Stats />);
        let input = screen.getByTestId("rawstr");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        let errorOutput = await screen.findByTestId("strerror");
        expect(errorOutput).toBeTruthy();
        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        errorOutput = await screen.findByTestId("strerror");
        expect(errorOutput).toBeTruthy();
    });

    it("The error appears when dex exceeds 18 or is below 3", async () => {
        render(<Stats />);
        let input = screen.getByTestId("rawdex");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawstr"));
        let errorOutput = await screen.findByTestId("dexerror");
        expect(errorOutput).toBeTruthy();
        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.click(screen.getByTestId("rawstr"));
        errorOutput = await screen.findByTestId("dexerror");
        expect(errorOutput).toBeTruthy();
    });

    it("The error appears when con exceeds 18 or is below 3", async () => {
        render(<Stats />);
        let input = screen.getByTestId("rawcon");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        let errorOutput = await screen.findByTestId("conerror");
        expect(errorOutput).toBeTruthy();
        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        errorOutput = await screen.findByTestId("conerror");
        expect(errorOutput).toBeTruthy();
    });

    it("The error appears when int exceeds 18 or is below 3", async () => {
        render(<Stats />);
        let input = screen.getByTestId("rawint");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        let errorOutput = await screen.findByTestId("interror");
        expect(errorOutput).toBeTruthy();
        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        errorOutput = await screen.findByTestId("interror");
        expect(errorOutput).toBeTruthy();
    });

    it("The error appears when wis exceeds 18 or is below 3", async () => {
        render(<Stats />);
        let input = screen.getByTestId("rawwis");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        let errorOutput = await screen.findByTestId("wiserror");
        expect(errorOutput).toBeTruthy();
        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        errorOutput = await screen.findByTestId("wiserror");
        expect(errorOutput).toBeTruthy();
    });

    it("The error appears when cha exceeds 18 or is below 3", async () => {
        render(<Stats />);
        let input = screen.getByTestId("rawcha");
        fireEvent.change(input, { target: { value: "19" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        let errorOutput = await screen.findByTestId("chaerror");
        expect(errorOutput).toBeTruthy();
        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.click(screen.getByTestId("rawdex"));
        errorOutput = await screen.findByTestId("chaerror");
        expect(errorOutput).toBeTruthy();
    });

}); 