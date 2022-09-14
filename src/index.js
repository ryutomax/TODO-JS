import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、値を初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除 関数
const deleteFromIncompleteList = (target) => {
  //.incomplete-listの子要素を削除
  document.getElementById("incomplete-list").removeChild(target);
};

//　未完了リストに追加する関数
const createIncompleteList = (text) => {
  // <li class="list-row"></li> 生成
  const li = document.createElement("li");
  li.className = "list-row";

  // <p></p> 生成
  const p = document.createElement("p");
  //pタグ内に入力値が設定された状態で出力
  p.innerText = text;

  // 完了button生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //完了ボタンをクリックするとliタグ（親タグ）を未完了エリアから削除
    deleteFromIncompleteList(completeButton.parentNode);

    const addTarget = completeButton.parentNode;
    //最初の子要素(TODO内)のテキストを取得
    const text = addTarget.firstElementChild.innerText;

    // li以下を初期化
    addTarget.textContent = null;

    //　pタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    // 戻るbutton生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 戻すボタンをクリックで親タグから削除
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // liタグの子要素に各要素設定
    addTarget.appendChild(p);
    addTarget.appendChild(backButton);

    //完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // 削除button生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //削除ボタンをクリックするとliタグ（親タグ）を削除
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  //liタグの子要素に各要素設定
  li.appendChild(p);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
