import AdminSlider from '../AdminSlider';
import {render, screen, fireEvent} from '@testing-library/react';

test('renders and checks the validity of AdminSlider', () => {

    // Create mock functions to pass and track.
    const changeFn = jest.fn(() => 99).mockName('changeFn'); // Always returns 99.
    const editFn = jest.fn().mockName('editFn');
    const delFn = jest.fn().mockName('delFn');
    const adjFn = jest.fn().mockName('adjFn');

    render(<AdminSlider 
        changeSliderHandler={changeFn}
        initialValue={12}
        initialName={"Name"}
        sliderGroups={{"ecological":{"global":{"Name":{"value": 12}}}}}
        ecoOrSoc={"ecological"}
        gloOrLoc={"global"}
        deleteFunction={delFn}
        editFunction={editFn}
        adjFunction={adjFn}
        />);
    
    // Select test elements.
    const title = screen.getByTestId("title");
    const editButton = screen.getByTestId("edit");
    const slider = screen.getByTestId("slider");
    const number = screen.getByTestId("number");
    const editAdjButton = screen.getByTestId("edit adjacent");
    const deleteButton = screen.getByTestId("delete");

    // Interact with test elements.
    fireEvent.click(editButton);
    fireEvent.change(slider, {target: {value: 0}});
    fireEvent.input(number, {target: {value: 0}});
    fireEvent.click(editAdjButton);
    fireEvent.click(deleteButton);

    // Assert results.
    expect(title).toHaveTextContent("Name");
    expect(number.getAttribute('value')).toEqual("12");
    expect(changeFn).toBeCalledTimes(2);
    expect(editFn).toBeCalledTimes(1);
    expect(delFn).toBeCalledTimes(1);
    expect(adjFn).toBeCalledTimes(1);
});