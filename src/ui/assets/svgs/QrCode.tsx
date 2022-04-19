import React from 'react';

interface IProps {
  width?: string;
  height?: string;
  fill?: string;
}

const QrCode: React.FC<IProps> = ({ height, width, fill }) => {
  return (
    <svg
      width={width || '29'}
      height={height || '30'}
      viewBox="0 0 29 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1347_9222)">
        <path
          d="M27.6235 0.677429H23.3544C23.2441 0.677429 23.1383 0.721239 23.0603 0.799222C22.9823 0.877205 22.9385 0.982972 22.9385 1.09326C22.9385 1.20354 22.9823 1.30931 23.0603 1.38729C23.1383 1.46527 23.2441 1.50908 23.3544 1.50908H27.6235C27.7338 1.5092 27.8394 1.55305 27.9174 1.63101C27.9954 1.70896 28.0392 1.81466 28.0393 1.92491V6.19406C28.0393 6.30435 28.0831 6.41011 28.1611 6.4881C28.2391 6.56608 28.3449 6.60989 28.4552 6.60989C28.5654 6.60989 28.6712 6.56608 28.7492 6.4881C28.8272 6.41011 28.871 6.30435 28.871 6.19406V1.92491C28.8706 1.59417 28.7391 1.27708 28.5052 1.04322C28.2713 0.809349 27.9542 0.677799 27.6235 0.677429V0.677429ZM0.899713 6.60989C1.01 6.60989 1.11576 6.56608 1.19375 6.4881C1.27173 6.41011 1.31554 6.30435 1.31554 6.19406V1.92491C1.31566 1.81466 1.35951 1.70896 1.43747 1.63101C1.51542 1.55305 1.62112 1.5092 1.73137 1.50908H6.00052C6.1108 1.50908 6.21657 1.46527 6.29455 1.38729C6.37254 1.30931 6.41635 1.20354 6.41635 1.09326C6.41635 0.982972 6.37254 0.877205 6.29455 0.799222C6.21657 0.721239 6.1108 0.677429 6.00052 0.677429H1.73137C1.40063 0.677799 1.08354 0.809349 0.849674 1.04322C0.615806 1.27708 0.484257 1.59417 0.483887 1.92491L0.483887 6.19406C0.483888 6.30435 0.527698 6.41011 0.60568 6.4881C0.683663 6.56608 0.78943 6.60989 0.899713 6.60989ZM28.4552 23.1321C28.3449 23.1321 28.2391 23.1759 28.1611 23.2539C28.0831 23.3318 28.0393 23.4376 28.0393 23.5479V27.817C28.0392 27.9273 27.9954 28.033 27.9174 28.1109C27.8394 28.1889 27.7338 28.2328 27.6235 28.2329H23.3544C23.2441 28.2329 23.1383 28.2767 23.0603 28.3547C22.9823 28.4326 22.9385 28.5384 22.9385 28.6487C22.9385 28.759 22.9823 28.8648 23.0603 28.9427C23.1383 29.0207 23.2441 29.0645 23.3544 29.0645H27.6235C27.9542 29.0642 28.2713 28.9326 28.5052 28.6987C28.7391 28.4649 28.8706 28.1478 28.871 27.817V23.5479C28.871 23.4376 28.8272 23.3318 28.7492 23.2539C28.6712 23.1759 28.5654 23.1321 28.4552 23.1321ZM6.00052 28.2329H1.73137C1.62112 28.2328 1.51542 28.1889 1.43747 28.1109C1.35951 28.033 1.31566 27.9273 1.31554 27.817V23.5479C1.31554 23.4376 1.27173 23.3318 1.19375 23.2539C1.11576 23.1759 1.01 23.1321 0.899713 23.1321C0.789429 23.1321 0.683662 23.1759 0.60568 23.2539C0.527697 23.3318 0.483887 23.4376 0.483887 23.5479L0.483887 27.817C0.484257 28.1478 0.615806 28.4649 0.849674 28.6987C1.08354 28.9326 1.40063 29.0642 1.73137 29.0645H6.00052C6.1108 29.0645 6.21657 29.0207 6.29455 28.9427C6.37254 28.8648 6.41635 28.759 6.41635 28.6487C6.41635 28.5384 6.37254 28.4326 6.29455 28.3547C6.21657 28.2767 6.1108 28.2329 6.00052 28.2329ZM4.64215 6.91483V11.184C4.64277 11.7352 4.86202 12.2637 5.2518 12.6535C5.64158 13.0432 6.17006 13.2625 6.72129 13.2631H10.9904C11.5417 13.2625 12.0701 13.0432 12.4599 12.6535C12.8497 12.2637 13.069 11.7352 13.0696 11.184V6.91483C13.069 6.3636 12.8497 5.83512 12.4599 5.44534C12.0701 5.05557 11.5417 4.83632 10.9904 4.8357H6.72129C6.17006 4.83632 5.64158 5.05557 5.2518 5.44534C4.86202 5.83512 4.64277 6.3636 4.64215 6.91483ZM5.47381 6.91483C5.47418 6.58409 5.60573 6.267 5.83959 6.03314C6.07346 5.79927 6.39055 5.66772 6.72129 5.66735H10.9904C11.3212 5.66772 11.6383 5.79927 11.8721 6.03314C12.106 6.267 12.2375 6.58409 12.2379 6.91483V11.184C12.2375 11.5147 12.106 11.8318 11.8721 12.0657C11.6383 12.2995 11.3212 12.4311 10.9904 12.4315H6.72129C6.39055 12.4311 6.07346 12.2995 5.83959 12.0657C5.60573 11.8318 5.47418 11.5147 5.47381 11.184V6.91483ZM7.83016 10.3523H9.88157C9.95509 10.3523 10.0256 10.3231 10.0776 10.2711C10.1296 10.2191 10.1588 10.1486 10.1588 10.0751V8.0237C10.1588 7.95018 10.1296 7.87966 10.0776 7.82768C10.0256 7.77569 9.95509 7.74648 9.88157 7.74648H7.83016C7.75663 7.74648 7.68612 7.77569 7.63413 7.82768C7.58215 7.87966 7.55294 7.95018 7.55294 8.0237V10.0751C7.55294 10.1486 7.58215 10.2191 7.63413 10.2711C7.68612 10.3231 7.75663 10.3523 7.83016 10.3523ZM18.3644 13.2631H22.6336C23.1848 13.2625 23.7133 13.0432 24.1031 12.6535C24.4928 12.2637 24.7121 11.7352 24.7127 11.184V6.91483C24.7121 6.3636 24.4928 5.83512 24.1031 5.44534C23.7133 5.05557 23.1848 4.83632 22.6336 4.8357H18.3644C17.8132 4.83632 17.2847 5.05557 16.8949 5.44534C16.5052 5.83512 16.2859 6.3636 16.2853 6.91483V11.184C16.2859 11.7352 16.5052 12.2637 16.8949 12.6535C17.2847 13.0432 17.8132 13.2625 18.3644 13.2631ZM17.117 6.91483C17.1173 6.58409 17.2489 6.267 17.4827 6.03314C17.7166 5.79927 18.0337 5.66772 18.3644 5.66735H22.6336C22.9643 5.66772 23.2814 5.79927 23.5153 6.03314C23.7491 6.267 23.8807 6.58409 23.8811 6.91483V11.184C23.8807 11.5147 23.7491 11.8318 23.5153 12.0657C23.2814 12.2995 22.9643 12.4311 22.6336 12.4315H18.3644C18.0337 12.4311 17.7166 12.2995 17.4827 12.0657C17.2489 11.8318 17.1173 11.5147 17.117 11.184V6.91483ZM19.4733 10.3523H21.5247C21.5982 10.3523 21.6687 10.3231 21.7207 10.2711C21.7727 10.2191 21.8019 10.1486 21.8019 10.0751V8.0237C21.8019 7.95018 21.7727 7.87966 21.7207 7.82768C21.6687 7.77569 21.5982 7.74648 21.5247 7.74648H19.4733C19.3998 7.74648 19.3293 7.77569 19.2773 7.82768C19.2253 7.87966 19.1961 7.95018 19.1961 8.0237V10.0751C19.1961 10.1486 19.2253 10.2191 19.2773 10.2711C19.3293 10.3231 19.3998 10.3523 19.4733 10.3523ZM21.3861 17.3105V16.4788H20.5545V17.3105H21.3861ZM22.2178 21.4688H23.0494V20.6371H22.2178V21.4688ZM20.5545 20.6371H19.7228V21.4688H20.5545V20.6371ZM19.7228 18.1421H20.5545V17.3105H19.7228V18.1421ZM14.2616 12.4315V13.2631H15.0933V12.4315H14.2616ZM24.7127 24.435V21.94C24.7127 21.8297 24.6689 21.724 24.5909 21.646C24.5129 21.568 24.4072 21.5242 24.2969 21.5242H23.6316C23.5213 21.5242 23.4155 21.568 23.3375 21.646C23.2596 21.724 23.2157 21.8297 23.2157 21.94C23.2157 22.0503 23.2596 22.1561 23.3375 22.2341C23.4155 22.312 23.5213 22.3559 23.6316 22.3559H23.8811V24.0192H18.4753C18.365 24.0192 18.2593 24.063 18.1813 24.141C18.1033 24.2189 18.0595 24.3247 18.0595 24.435C18.0595 24.5453 18.1033 24.651 18.1813 24.729C18.2593 24.807 18.365 24.8508 18.4753 24.8508H24.2969C24.4072 24.8508 24.5129 24.807 24.5909 24.729C24.6689 24.651 24.7127 24.5453 24.7127 24.435ZM18.3644 19.8609H22.6336C22.7439 19.8609 22.8496 19.8171 22.9276 19.7391C23.0056 19.6611 23.0494 19.5554 23.0494 19.4451C23.0494 19.3348 23.0056 19.229 22.9276 19.151C22.8496 19.0731 22.7439 19.0292 22.6336 19.0292H18.3644C18.2541 19.0292 18.1484 19.0731 18.0704 19.151C17.9924 19.229 17.9486 19.3348 17.9486 19.4451C17.9486 19.5554 17.9924 19.6611 18.0704 19.7391C18.1484 19.8171 18.2541 19.8609 18.3644 19.8609ZM20.0277 23.1875H21.8019C21.9122 23.1875 22.018 23.1437 22.096 23.0657C22.1739 22.9877 22.2178 22.882 22.2178 22.7717C22.2178 22.6614 22.1739 22.5556 22.096 22.4776C22.018 22.3997 21.9122 22.3559 21.8019 22.3559H20.0277C19.9175 22.3559 19.8117 22.3997 19.7337 22.4776C19.6557 22.5556 19.6119 22.6614 19.6119 22.7717C19.6119 22.882 19.6557 22.9877 19.7337 23.0657C19.8117 23.1437 19.9175 23.1875 20.0277 23.1875ZM9.88157 19.3896H7.83016C7.75663 19.3896 7.68612 19.4188 7.63413 19.4708C7.58215 19.5228 7.55294 19.5933 7.55294 19.6668V21.7183C7.55294 21.7918 7.58215 21.8623 7.63413 21.9143C7.68612 21.9663 7.75663 21.9955 7.83016 21.9955H9.88157C9.95509 21.9955 10.0256 21.9663 10.0776 21.9143C10.1296 21.8623 10.1588 21.7918 10.1588 21.7183V19.6668C10.1588 19.5933 10.1296 19.5228 10.0776 19.4708C10.0256 19.4188 9.95509 19.3896 9.88157 19.3896ZM10.9904 16.4788H6.72129C6.17006 16.4795 5.64158 16.6987 5.2518 17.0885C4.86202 17.4783 4.64277 18.0067 4.64215 18.558V22.8271C4.64277 23.3784 4.86202 23.9068 5.2518 24.2966C5.64158 24.6864 6.17006 24.9056 6.72129 24.9063H10.9904C11.5417 24.9056 12.0701 24.6864 12.4599 24.2966C12.8497 23.9068 13.069 23.3784 13.0696 22.8271V18.558C13.069 18.0067 12.8497 17.4783 12.4599 17.0885C12.0701 16.6987 11.5417 16.4795 10.9904 16.4788ZM12.2379 22.8271C12.2375 23.1579 12.106 23.475 11.8721 23.7088C11.6383 23.9427 11.3212 24.0742 10.9904 24.0746H6.72129C6.39055 24.0742 6.07346 23.9427 5.83959 23.7088C5.60573 23.475 5.47418 23.1579 5.47381 22.8271V18.558C5.47418 18.2272 5.60573 17.9101 5.83959 17.6763C6.07346 17.4424 6.39055 17.3109 6.72129 17.3105H10.9904C11.3212 17.3109 11.6383 17.4424 11.8721 17.6763C12.106 17.9101 12.2375 18.2272 12.2379 18.558V22.8271ZM14.6774 18.9738C14.5672 18.9738 14.4614 19.0176 14.3834 19.0956C14.3054 19.1736 14.2616 19.2793 14.2616 19.3896V24.4904C14.2616 24.6007 14.3054 24.7065 14.3834 24.7845C14.4614 24.8624 14.5672 24.9063 14.6774 24.9063C14.7877 24.9063 14.8935 24.8624 14.9715 24.7845C15.0495 24.7065 15.0933 24.6007 15.0933 24.4904V19.3896C15.0933 19.2793 15.0494 19.1736 14.9715 19.0956C14.8935 19.0176 14.7877 18.9738 14.6774 18.9738ZM14.2616 17.3105H15.0933V16.4788H14.2616V17.3105ZM16.2853 24.8508H17.117V24.0192H16.2853V24.8508ZM16.7011 16.4788C16.5908 16.4788 16.4851 16.5227 16.4071 16.6006C16.3291 16.6786 16.2853 16.7844 16.2853 16.8947V21.9955C16.2853 22.1058 16.3291 22.2115 16.4071 22.2895C16.4851 22.3675 16.5908 22.4113 16.7011 22.4113C16.8114 22.4113 16.9172 22.3675 16.9952 22.2895C17.0731 22.2115 17.117 22.1058 17.117 21.9955V16.8947C17.117 16.7844 17.0731 16.6786 16.9952 16.6006C16.9172 16.5227 16.8114 16.4788 16.7011 16.4788ZM18.0595 20.9975V22.7717C18.0595 22.882 18.1033 22.9877 18.1813 23.0657C18.2593 23.1437 18.365 23.1875 18.4753 23.1875C18.5856 23.1875 18.6914 23.1437 18.7694 23.0657C18.8473 22.9877 18.8911 22.882 18.8911 22.7717V20.9975C18.8911 20.8872 18.8473 20.7814 18.7694 20.7035C18.6914 20.6255 18.5856 20.5817 18.4753 20.5817C18.365 20.5817 18.2593 20.6255 18.1813 20.7035C18.1033 20.7814 18.0595 20.8872 18.0595 20.9975ZM24.2969 19.9163C24.4072 19.9163 24.5129 19.8725 24.5909 19.7945C24.6689 19.7166 24.7127 19.6108 24.7127 19.5005V16.8947C24.7127 16.7844 24.6689 16.6786 24.5909 16.6006C24.5129 16.5227 24.4072 16.4788 24.2969 16.4788H22.6871C22.5768 16.4788 22.471 16.5226 22.393 16.6006C22.3151 16.6786 22.2713 16.7844 22.2713 16.8947C22.2713 17.005 22.3151 17.1107 22.393 17.1887C22.471 17.2667 22.5768 17.3105 22.6871 17.3105H23.8811V19.5005C23.8811 19.6108 23.9249 19.7166 24.0029 19.7945C24.0808 19.8725 24.1866 19.9163 24.2969 19.9163ZM13.7211 5.66735H14.2616V11.184C14.2616 11.2943 14.3054 11.4 14.3834 11.478C14.4614 11.556 14.5672 11.5998 14.6774 11.5998C14.7877 11.5998 14.8935 11.556 14.9715 11.478C15.0495 11.4 15.0933 11.2943 15.0933 11.184V5.25152C15.0933 5.14124 15.0494 5.03547 14.9715 4.95749C14.8935 4.87951 14.7877 4.8357 14.6774 4.8357H13.7211C13.6109 4.8357 13.5051 4.87951 13.4271 4.95749C13.3491 5.03547 13.3053 5.14124 13.3053 5.25152C13.3053 5.36181 13.3491 5.46757 13.4271 5.54556C13.5051 5.62354 13.6109 5.66735 13.7211 5.66735ZM27.1522 14.871C27.1522 14.7607 27.1084 14.6549 27.0304 14.5769C26.9525 14.499 26.8467 14.4552 26.7364 14.4552H2.61846C2.50818 14.4552 2.40241 14.499 2.32443 14.5769C2.24645 14.6549 2.20264 14.7607 2.20264 14.871C2.20264 14.9813 2.24645 15.087 2.32443 15.165C2.40241 15.243 2.50818 15.2868 2.61846 15.2868H26.7364C26.8467 15.2868 26.9525 15.243 27.0304 15.165C27.1084 15.087 27.1522 14.9813 27.1522 14.871Z"
          fill={fill || '#7765C4'}
        />
      </g>
      <defs>
        <clipPath id="clip0_1347_9222">
          <rect width="28.3871" height="28.3871" fill="white" transform="translate(0.483887 0.677429)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default QrCode;
