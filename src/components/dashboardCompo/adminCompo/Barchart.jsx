import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';

const Barchart = ({stats}) => {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const barData = stats.map(data => {
        return {name: data.testTitle, booking: data.totalBookings}
    })
    return (
        <div>
            <h1 className="text-2xl font-bold font-ubuntu text-center mb-10">Most Booked Tests</h1>
            <BarChart
                width={600}
                height={300}
                data={barData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="booking" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                    {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
};

export default Barchart;