
interface DefaultModalProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  open: boolean;
  handleClose: () => void;
}

export function DefaultModal({
  title,
  handleClose,
  open,
  children,
  ...props
}: DefaultModalProps) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOutsideClick = (e: any) => {
    
    if (open && e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };

  return (
    open && (
      <div
        {...props}
        onClick={handleOutsideClick}
        className="fixed inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto bg-neutral-800/30 modal-overlay"
      >
        <div className="w-full h-full max-h-full flex items-center justify-center m-auto modal-overlay">
          <div className="w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow ">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  {title}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleClose}
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
