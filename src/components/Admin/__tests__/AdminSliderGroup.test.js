import AdminSliderGroup from '../AdminSliderGroup';
import {render, screen, fireEvent} from '@testing-library/react';

test('renders and checks validity of AdminSliderGroup', () => {

    // Mocked functions.
    const newFn = jest.fn().mockName("newFn");

    // Null functions are just passed to children.
    render(<AdminSliderGroup
        sliders={{}}
        sliderGroups={{}}
        changeSliderHandler={null}
        ecoOrSoc={"ecological"}
        gloOrLoc={"global"}
        deleteFunction={null}
        editFunction={null}
        newFunction={newFn}
        adjFunction={null}
        />);

        // Select test elements.
        const title = screen.getByTestId("title");
        const addBtn = screen.getByTestId("add button");

        // Interact with test elements.
        fireEvent.click(addBtn);

        // Assert valid results.
        expect(title).toHaveTextContent("Ecological - Global");
        expect(newFn).toHaveBeenCalledTimes(1);

})