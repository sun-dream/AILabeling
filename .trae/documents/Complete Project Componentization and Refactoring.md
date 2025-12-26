I have successfully refactored the project from 0 to 1 as requested, implementing the component structure defined in `build.md`.

**Summary of Changes:**

1.  **Structure**: Created a new directory structure under `src/components`:
    -   `common/`: Reusable components (`Navbar`, `EventCard`, `SectionDivider`, `Marquee`).
    -   `sections/`: Page sections (`Hero`, `Lectures`, `Workshops`, `Schedule`, `Footer`).
    -   `ui/`: Atomic interactive components (`DraggablePaper`).

2.  **Implementation Details**:
    -   **Navbar**: Implemented with logo, menu items, and background texture.
    -   **Hero**: Refactored to use `DraggablePaper` with `p1.png` - `p10.png` images and parallax title.
    -   **Lectures & Workshops**: Refactored to use `EventCard` with the specific background/foreground images listed in `build.md` and `SectionDivider` for the torn paper effect.
    -   **Schedule**: Refactored to match the visual style with dashed borders and yellow paper dividers.
    -   **Footer**: Added `Marquee`, full list of 17 sponsor logos, and footer links.
    -   **Global**: Updated `tailwind.config.js` for animations and `index.css` for the global paper texture background.

The codebase is now fully componentized and aligns with the visual and functional requirements of the DA! Festival website.
