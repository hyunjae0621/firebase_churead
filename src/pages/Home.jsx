import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Nav from '../components/layout/Nav';
import FeedItem from '../components/FeedItem';
import { initialFeedList } from '../data/response';
import { useNavigate } from 'react-router-dom';

const Home = ({ churead, editedItem, onEdit }) => {
  // console.log("🚀 editedItem:", editedItem)
  // logic
  const history = useNavigate();
  const [feedList, setFeedList] = useState(initialFeedList);

  // console.log("churead", churead);

  /**
   * 아이템 삭제하기
   * 1. 휴지통 아이콘이 있는 버튼을 클릭한다
   * 2. 클릭 이벤트가 발생한다
   * 3. 클릭 이벤트가 발생시 handleDelete라는 함수가 호출된다
   * 4. handleDelete 내부 논리
   * 4-1. confirm 창을 띄운다
   * 4-2. 사용자가 선택한 값을 ok 라는 변수에 저장한다
   * 4-3. 사용자가 선택한 값이 true 이면 onDelete 라는 이벤트를 호출한다
   * 4-4. onDelete 라는 이벤트에서 선택된 아이템 즉 data를 인자에 넘겨준다
   * 5. 부모는 onDelete라는 이벤트에 handleDelete 라는 함수를 연결한다
   * 6. handleDelete라는 함수에서 인자를 확인한다
   * 7. feedList에 filter 함수를 사용한다
   * 8. filter 함수에서 각 요소들의 id 값과 자식으로부터 받은 인자의 id 값과
   * 비교해서 일치 하지 않는 요소들만 뽑아온다.
   * 9. filter 함수로 리턴받은 배열을 feedList 라는 state 에 반영한다
   */
  const handleEdit = (data) => {
    onEdit(data); // 부모에게 수정할 객체 아이템 넘겨주기
    history('/edit'); // edit 페이지로 이동
  };

  const handleDelete = (selectedItem) => {
    const filterList = feedList.filter((item) => item.id !== selectedItem.id);
    setFeedList(filterList);
  };

  const getData = async () => {
    // fetch("https://jsonplaceholder.typicode.com/todos")
    // .then(response => response.json())
    // .then(json => console.log(json))

    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    console.log('🚀 ~ getData ~ response:', response);
    const data = await response.json();
    console.log('🚀 ~ getData ~ data:', data);
  };

  // 진입시 딱 한번 실행
  useEffect(() => {
    if (!churead) return;
    const newFeed = {
      id: feedList.length + 1,
      userName: 'anonymous',
      userProfileImage:
        'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      churead: churead,
      likeCount: 0,
    };
    // feedList에 객체 추가
    setFeedList([newFeed, ...feedList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!editedItem) return;

    //editedItem 값이 있는 경우에
    const resultFeedList = feedList.map((item) => {
      if (item.id === editedItem.id) return editedItem;

      return item;
    });

    setFeedList(resultFeedList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedItem]);

  // view
  return (
    <div className="h-full pt-20 pb-[74px] overflow-hidden">
      {/* START: 헤더 영역 */}
      <Header />
      {/* END: 헤더 영역 */}
      <main className="h-full overflow-auto">
        <button type="button" onClick={getData}>
          데이터 가져오기
        </button>
        <div>
          {/* START: 피드 영역 */}
          <ul>
            {feedList.map((feed) => (
              <FeedItem
                key={feed.id}
                data={feed}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </ul>
          {/* END: 피드 영역 */}
        </div>
      </main>
      {/* START: 네비게이션 영역 */}
      <Nav />
      {/* END: 네비게이션 영역 */}
    </div>
  );
};

export default Home;
