// 前端 index.js

// =============================

// 點擊刪除按鈕後，將 id 傳給 Modal 的表單
$('#data-plane').on('click', e => {
  if (e.target.matches('.del-btn')) {
    const id = e.target.dataset.id

    // 將 id 注入 form action
    let formAction = $('#del-form').attr('action')
    formAction = formAction.replace('{id}', id)

    $('#del-form').attr('action', formAction)
  }
})

// 監聽 todos checkbox
$('#data-plane').change(e => {
  $(e.target).parent().submit()
})