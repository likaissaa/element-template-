/*
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-11-11
 */
export default {
    functional: true,
    name: "columnRender",
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        },
        click: Function
    },
    render: (h, el) => {
        const params = {
            row: el.props.row,
            index: el.props.index
        };
        if (el.props.column) params.column = el.props.column;
        if (el.props.render)
            return el.props.render(h, params);
    },
    click: function (h, el) {
        return el.props.click();
    }
}