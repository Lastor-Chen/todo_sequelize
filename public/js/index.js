// 前端 index.js

$('#data-plane').on('submit', e => {
  if (e.target.matches('.del-form')) {
    e.preventDefault()

    const msg = '刪除後無法復原，確定刪除嗎?'
    if (confirm(msg)) { e.target.submit() }
  }
})