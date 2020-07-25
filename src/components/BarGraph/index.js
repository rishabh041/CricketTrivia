import React, { PureComponent } from 'react';
import BarChart from 'react-bar-chart';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

class BarGraph extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 500,
        };
    }
    componentDidMount() {
        console.log("barGraph componentDidMount")
        window.addEventListener('resize', this.handleResize);
        this.setState({
            width: this.graphRef.offsetWidth,
        })
        // window.onresize = () => {
        //     this.setState({ width: this.graphRef.offsetWidth });
        // };
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    handleResize = () => {
        this.setState({ width: this.graphRef.offsetWidth });
    }

    render() {
        console.log("barGraph render");
        const data = [
            { text: 'Correct', value: this.props.correctAns },
            { text: 'Incorrect', value: this.props.wrongAns }
        ];
        return (
            <div ref={(ref) => this.graphRef = ref}>
                <BarChart
                    ylabel='Number'
                    width={this.state.width}
                    height={500}
                    margin={margin}
                    data={data}
                />
            </div>
        );
    }
}

export default BarGraph