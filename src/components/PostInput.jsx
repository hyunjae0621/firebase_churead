import React, { useEffect, useRef, useState } from 'react';

const PostInput = ({
  userName = 'Anonymous',
  userProfileImage = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
  defaultValue = '',
  onChange,
}) => {
  // logic

  const textareRef = useRef(null);

  const [value, setValue] = useState(defaultValue);

  const hanldeChange = (event) => {
    const { value } = event.target;
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    console.log(textareRef);
    textareRef.current && textareRef.current.focus();
    const length = value.length;
    textareRef.current && textareRef.current.setSelectionRange(length, length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view
  return (
    <div className="px-6 border-t border-churead-gray-300 border-opacity-15 pt-3">
      <div className="flex items-start gap-3">
        {/* START: 프로필 이미지 영역 */}
        <div className="w-10 rounded-full overflow-hidden mt-1">
          <img src={userProfileImage} alt="사용자 프로필 이미지" />
        </div>
        {/* END: 프로필 이미지 영역 */}
        {/* START: 콘텐츠 영역 */}
        <div className="w-full">
          <div className="flex items-center">
            <span className="font-bold">{userName}</span>
          </div>
          <div className="pt-1 text-sm">
            <textarea
              ref={textareRef}
              rows={4}
              placeholder="문구를 작성하세요"
              value={value}
              className="w-full placeholder-churead-gray-300 placeholder-opacity-60 text-churead-gray-400 bg-transparent outline-none resize-none"
              onChange={hanldeChange}
            />
          </div>
        </div>
        {/* END: 콘텐츠 영역 */}
      </div>
    </div>
  );
};

export default PostInput;
