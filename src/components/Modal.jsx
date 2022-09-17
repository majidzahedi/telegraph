import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({ isOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }

  // function openModal() {
  //   setIsOpen(true);
  // }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed left-0 top-0 h-[100%] overflow-y-auto">
            <div className="flex h-full min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="-translate-x-[100%]"
                enterTo="translate-x-0 "
                leave="ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-[100%]"
              >
                <Dialog.Panel className="h-full w-full max-w-md transform overflow-hidden rounded-r-2xl bg-gray-900/90 p-6 text-left align-middle shadow-xl  transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-300"
                  >
                    Lorem ipsum dolor .
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-100">
                      Lorem ipsum dolor sit amet, officia excepteur ex fugiat
                      reprehenderit enim labore culpa sint ad nisi Lorem
                      pariatur mollit ex esse exercitation amet. Nisi anim
                      cupidatat excepteur officia. Reprehenderit nostrud nostrud
                      ipsum Lorem est aliquip amet voluptate voluptate dolor
                      minim nulla est proident. Nostrud officia pariatur ut
                      officia. Sit irure elit esse ea nulla sunt ex occaecat
                      reprehenderit commodo officia dolor Lorem duis laboris
                      cupidatat officia voluptate. Culpa proident adipisicing id
                      nulla nisi laboris ex in Lorem sunt duis officia eiusmod.
                      Aliqua reprehenderit commodo ex non excepteur duis sunt
                      velit enim. Voluptate laboris sint cupidatat ullamco ut ea
                      consectetur et est culpa et culpa duis.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
