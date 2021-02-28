import {TextField} from '@material-ui/core';

const TimePicker = ({endOfDay, handleChangeTime}) => {
    return (
        <div noValidate className="timepicker-wrapper">
            <h6>Change end-of-day time</h6>
            <TextField
                id="time-value"
                type="time"
                defaultValue={endOfDay}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <button id="timepicker-submit" onClick={() => handleChangeTime('submit')}>Change</button>
            <button id="timepicker-cancel" onClick={() => handleChangeTime('cancel')}>Cancel</button>
        </div>    
    )
}

export default TimePicker