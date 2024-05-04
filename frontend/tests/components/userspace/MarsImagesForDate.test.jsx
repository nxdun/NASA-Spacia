import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import MarsImagesForDate from "src/components/userSpace/subcomps/MarsImagesForDate";
import "@testing-library/jest-dom/vitest";

describe('test cases for mars images for date', () => {

    it('should render image gallery', () => {
        const p = { rover: "Curiosity", button: "FHAZ" };
        render(<MarsImagesForDate  p = {p}/>);

        const imageGallery = screen.getByTestId('mars-image-gallery');
        expect(imageGallery).toBeVisible();
        
    })
})