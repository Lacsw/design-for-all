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

  /**
   * !!!DEPRECATED\
   * Type for **result** of call react hook `useState`.
   *
   * !!!GOOD Alternative:\
   * Work with the type of the initial value directly.\
   * Clearly indicate all the possible types of the initial value of hook.\
   * To do this:
   *
   * - wrap the initial value into the round brackets (the argument with which the
   *   useState hook calls),
   * - give a JSDoc-comment for this wrapped value in which, through the tag
   *   `type`, indicate the union type of value.
   *
   * Example:\
   * const [inputMode, setInputMode] = useState(\
   * /-- #type {'read' | 'write'} --/('read')\
   * );\
   *
   * @deprecated This approach expands type to undefined without need.\
   *   The alternative approach have not seen problems in it yet.
   */
  type TState<T> = ReturnType<typeof React.useState<T>>;
  // #endregion React

  interface RefObj<T = null> {
    cur: T;
  }
}

export {};
