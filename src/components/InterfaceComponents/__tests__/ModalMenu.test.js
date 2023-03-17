import ModalMenu from '../ModalMenu'
import {render, screen, fireEvent} from '@testing-library/react';

test('test the validity of ModalMenu', () => {

    // Mock function props.
    const closeFn = jest.fn().mockName("closeFn");
    const saveFn = jest.fn().mockName("saveFn");

    // Render ModalMenu.
    render(<ModalMenu
        isShow={true}
        title={"title"}
        OnClose={closeFn}
        OnSave={saveFn}
        canSave={true}
        >
            <div data-testid='test div'></div>
        </ModalMenu>);

    // Get test elements.
    const title = screen.getByTestId("modal title");
    const body = screen.getByTestId("modal body");
    const closeBtn = screen.getByTestId("modal close");
    const saveBtn = screen.getByTestId("modal save");
    const testDiv = screen.getByTestId("test div");

    // Assert the component populates correctly.
    expect(title).toHaveTextContent("title");
    expect(body).toContainElement(testDiv);

    // Interact with test elements.
    fireEvent.click(closeBtn);
    fireEvent.click(saveBtn);

    // Assert events fire correctly.
    expect(closeFn).toHaveBeenCalledTimes(1);
    expect(saveFn).toHaveBeenCalledTimes(1);

})