// this file is a modified version of this component example from 2021, thanks!
// https://github.com/ScholtenSeb/chakra-ui-react-datepicker

import { FC, forwardRef, useMemo, Ref, InputHTMLAttributes } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  StyleObjectOrFn,
  Text,
  useTheme,
  css as chakraCSS,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineCalendar as CalendarIcon } from "react-icons/ai";
import {
  BiChevronLeft as ChevronLeftIcon,
  BiChevronRight as ChevronRightIcon,
} from "react-icons/bi";
import { ClassNames } from "@emotion/react";

type CustomHeaderProps = {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
};

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

// TODO: possible refactor, extract css to globalTheme files
function useDatePickerStyles() {
  const theme = useTheme();
  return useMemo(() => {
    const defaultStyles: StyleObjectOrFn = {
      bg: "white",
      border: "1px solid",
      borderColor: "simpleBorder.100",
      boxShadow: "sm",
      "& .react-datepicker": {
        "&__header": {
          bg: "none",
          borderBottom: "none",
        },
        "&__month": {
          mt: 0,
        },
        "&__day-name": {
          color: "gray.400",
          fontWeight: "medium",
          w: 7,
        },
        "&__day": {
          lineHeight: "28px",
          color: "gray.700",
          w: 7,
          h: 7,
          borderRadius: "full",
        },
        "&__day:not(.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected):hover":
          {
            bg: "white",
            boxShadow: "0 0 1px 1px rgba(0,0,0,0.2)",
          },
        "&__day--today": {
          bg: "gray.100",
          fontWeight: "400",
        },
        "&__day--selected, &__day--keyboard-selected": {
          bg: "#c71a4b",
          color: "white",
        },
      },
    };
    return chakraCSS(defaultStyles)(theme);
  }, [theme]);
}

// the actual input
const CustomInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref: Ref<HTMLInputElement>) => {
    return (
      <InputGroup width="auto">
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          <Input {...props} ref={ref} size="md" rounded={10} variant="dateTime" borderWidth="1px" />
          <InputRightElement
            color="#c71a4b"
            userSelect="none"
            pointerEvents="none"
            children={<CalendarIcon />}
            padding={0}
          />
        </Flex>
      </InputGroup>
    );
  }
);

// this is actually the popout date modal
const CustomHeader: React.FC<CustomHeaderProps> = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
      timeZone: "America/New_York",
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <Flex alignItems="center" justifyContent="space-between" padding={0}>
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Previous Month"
        icon={<ChevronLeftIcon fontSize="14px" />}
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <Text color="gray.700" flex={1} fontSize="sm" fontWeight="medium">
        {formatDate(date)}
      </Text>
      <IconButton
        borderRadius="full"
        size="sm"
        variant="ghost"
        aria-label="Next Month"
        icon={<ChevronRightIcon fontSize="14px" />}
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </Flex>
  );
};

export const DatePicker: FC<DatePickerProps> = ({ value, onChange }) => {
  const styles = useDatePickerStyles();

  return (
    <ClassNames>
      {({ css }) => (
        <ReactDatePicker
          dateFormat="MMMM dd, yyyy"
          showPopperArrow={false}
          popperClassName={css({ marginTop: "12px!important" })}
          calendarClassName={css(styles)}
          selected={value}
          onChange={(date) => onChange(date as Date | null)}
          customInput={<CustomInput />}
          renderCustomHeader={CustomHeader}
          enableTabLoop={false}
        />
      )}
    </ClassNames>
  );
};
