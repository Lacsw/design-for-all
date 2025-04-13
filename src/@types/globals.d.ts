declare global {
  interface Window {
    /** Иммет ли текущее устройство имеет тачскрин. */
    isTouchDevice: boolean;
  }

  // #region React
  interface IBaseProps {
    className?: string;
    id?: string;
    sx?: SxProps<Theme>;
  }

  /** Type for **result** of call react hook `useState`. */
  type TState<T> = ReturnType<typeof React.useState<T>>;
  // #endregion React
}

export {};
