import AdjacencyModal from '../AdjacencyModal'
import {render, screen, fireEvent} from '@testing-library/react';

test('tests the validity of the AdjacencyModal', () =>{

    const sliderGroupsFn = jest.fn().mockName('sliderGroupsFn');
    const showFn = jest.fn().mockName('showFn');

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

    render(<AdjacencyModal
        lastCategorySelect={{'ecoOrSoc': 'ecological', 'gloOrLoc': 'global'}}
        lastSliderName={'A'}
        isShow={true}
        setShow={showFn}
        sliderGroups={sliderGroups}
        setSliderGroups={sliderGroupsFn}
    />);

    // Select test elements.
    const adj = screen.getByTestId("adj li");
    const adjDeleteBtn = screen.getByTestId("adj delete");

    const closeBtn = screen.getByTestId("modal close");

    // Assert the adjacencies are properly displayed
    expect(adj).toHaveTextContent("ecological global A→ecological global B: A message");

    // Interact with test elements.
    fireEvent.click(adjDeleteBtn);
    fireEvent.click(closeBtn);

    // Assert modal closed properly.
    expect(sliderGroupsFn).toBeCalledTimes(1);
    expect(showFn).toBeCalledTimes(1);
})