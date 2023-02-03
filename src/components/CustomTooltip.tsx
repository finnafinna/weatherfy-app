import PropTypes from 'prop-types';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex flex-col items-center p-3 outline-zinc-200 outline bg-white/50 rounded-xl font-inter font-semibold">
            <p className='font-normal'>{`${label}`}</p>
            <p className="text-black">{`${payload[0].value}`}°</p>
        </div>
      );
    }
  
    return null;
  };

  CustomTooltip.propTypes = {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  }

  export default CustomTooltip;
