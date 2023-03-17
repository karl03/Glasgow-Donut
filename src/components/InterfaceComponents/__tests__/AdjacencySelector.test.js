import AdjacencySelector from '../AdjacencySelector'
import {render, screen, fireEvent} from '@testing-library/react';

test('tests the validity of AdjacencySelector', () => {

    const sliderGroupsFn = jest.fn().mockName('sliderGroupsFn');

    const sliderGroups = {'ecological':{'global':{
        'A':{
            'value':0,
            'adjacent':[
                ["ecological", "global", "B", "A message"]
            ]
        },
        'B':{
            'value':0,
            'adjacent':[
                ["ecological", "global", "A", "B message"]
            ]
        }
        }}};

    render(<AdjacencySelector
        sliderGroups={sliderGroups}
        lastSliderName={'A'}
        SetSliderGroups={sliderGroupsFn}
        ecoOrSoc={'ecological'}
        gloOrLoc={'global'}
    />);

    // Select test elements.
    const ecoOrSoc = screen.getByTestId("adjSelect ecoOrSoc");
    const gloOrLoc = screen.getByTestId("adjSelect gloOrLoc");
    const sector = screen.getByTestId("adjSelect sector");
    const sectorOptions = screen.getAllByTestId("adj-select sector option");
    const message = screen.getByTestId("adjSelect message");
    const submit = screen.getByTestId("adjSelect submit");

    // Assert the selector is correctly populated.
    expect(ecoOrSoc).toHaveDisplayValue(["Ecological"]);
    expect(gloOrLoc).toHaveDisplayValue(["Global"]);
    expect(sector).toHaveDisplayValue(["Select..."]);
    expect(message).toHaveDisplayValue("");
    expect(submit).toBeDisabled();

    // Interact with test elements.
    fireEvent.change(sector, {target: {value: 'B'}});
    message.value = "A new message.";

    // Assert valid adjacency data input.
    expect(sector).toHaveDisplayValue(["B"]);
    expect(submit).toBeEnabled();

    // Submit form.
    fireEvent.click(submit);

    // Assert submission is valid.
    expect(sliderGroupsFn).toHaveBeenCalledTimes(1);

})