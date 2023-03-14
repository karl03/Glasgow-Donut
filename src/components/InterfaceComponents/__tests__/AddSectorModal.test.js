import {populateForm} from '../ModalFunctions';
import AddSectorModal from '../AddSectorModal'
import {render, screen} from '@testing-library/react';

test('tests the validity of the ModalFunctions collection of functions', () => {

    // Mock functions.
    const showFn = jest.fn().mockName('showFn');
    const sliderGroupFn = jest.fn().mockName('sliderGroupFn');

    const sliderGroups = {'ecological':{'global':{'name':{
        'value':0,
        'indicator':'1',
        'indicator_link':'2',
        'target':'3',
        'target_link':'4',
        'description':'5',
        'quotes':'6',
    }}}};

    render(<AddSectorModal
        lastCategorySelect={{'ecoOrSoc': 'ecological', 'gloOrLoc': 'global'}}
        lastSliderName={'name'}
        isShow={true}
        setShow={showFn}
        sliderGroups={sliderGroups}
        setSliderGroups={sliderGroupFn}
    />)

    // Select test elements.
    const title = screen.getByTestId('add modal title');
    const value = screen.getByTestId('add modal value');
    const indicator = screen.getByTestId('add modal indicator');
    const indicatorLink = screen.getByTestId('add modal indicator link');
    const target = screen.getByTestId('add modal target');
    const targetLink = screen.getByTestId('add modal target link');
    const description = screen.getByTestId('add modal description');
    const cites = screen.getByTestId('add modal cites');

    // Assert valid population of form.
    populateForm(sliderGroups, 'name', 'ecological', 'global');

    expect(title.value).toBe('name');
    expect(value.value).toBe('0');
    expect(indicator.value).toBe('1');
    expect(indicatorLink.value).toBe('2');
    expect(target.value).toBe('3');
    expect(targetLink.value).toBe('4');
    expect(description.value).toBe('5');
    expect(cites.value).toBe('6');

    // Interact with test elements.
    value.value = '10';
    indicator.value = '11';
    indicatorLink.value = '12';
    target.value = '13';
    targetLink.value = '14';
    description.value = '15';
    cites.value = '16';

    // Assert modified values are valid.
    expect(title.value).toBe('name');
    expect(value.value).toBe('10');
    expect(indicator.value).toBe('11');
    expect(indicatorLink.value).toBe('12');
    expect(target.value).toBe('13');
    expect(targetLink.value).toBe('14');
    expect(description.value).toBe('15');
    expect(cites.value).toBe('16');
})