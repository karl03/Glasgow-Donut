import AdminDonutGraph from '../AdminDonutGraph';
import {render, screen, queryByAttribute} from '@testing-library/react';

test('renders and checks the validity of AdminDonutGraph', () => {

    // Make class query.
    const getByClass = queryByAttribute.bind(null, 'class');

    const graph = render(<AdminDonutGraph 
        sliderGroups={{ecological:{global:{}, local:{}}, social:{global:{}, local:{}}}}
        size={500}
        />);

    // Select test elements.
    const container = screen.getByTestId("donut container");
    const barChart = getByClass(graph.container, 'svgClass'); // Get graph svg.

    // Assert results.
    expect(container).toContainElement(barChart);  
})