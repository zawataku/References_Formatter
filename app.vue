<template>

  <!-- GitHub Corners -->
  <a href="https://github.com/zawataku/References_Generator" class="github-corner" aria-label="View source on GitHub">
    <svg width="80" height="80" viewBox="0 0 250 250"
      style="fill:rgb(59 130 246); color:rgb(229 231 235); position: absolute; top: 0; border: 0; right: 0;"
      aria-hidden="true">
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
      <path
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm" />
      <path
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor" class="octo-body" />
    </svg>
  </a>

  <main class="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-200">
    <div class="w-full max-w-2xl p-8 bg-white shadow-lg rounded-xl relative">
      <h1 class="text-3xl font-bold mb-8 text-center">参考文献フォーマッタくん</h1>

      <!-- 参考文献のタイプ選択 -->
      <div class="flex space-x-4 mb-6 justify-between">
        <button v-for="(type, index) in referenceTypes" :key="index" @click="currentType = type"
          :class="{ 'bg-blue-500 text-white': currentType === type, 'bg-gray-200': currentType !== type }"
          class="p-2 rounded-lg w-full">
          {{ type }}
        </button>
      </div>

      <!-- 図書 -->
      <div v-if="currentType === '図書'">
        <form @submit.prevent="formatCitation">
          <div class="mb-4">
            <label class="block text-sm font-medium">著者名</label>
            <input v-model="author" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">書名</label>
            <input v-model="bookTitle" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">出版社</label>
            <input v-model="publisher" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">出版年</label>
            <input v-model="year" type="number" class="border p-2 w-full rounded-lg" />
          </div>
        </form>
      </div>

      <!-- 雑誌論文 -->
      <div v-if="currentType === '雑誌論文'">
        <form @submit.prevent="formatCitation">
          <div class="mb-4">
            <label class="block text-sm font-medium">著者名</label>
            <input v-model="author" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">論文タイトル</label>
            <input v-model="paperTitle" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">雑誌名</label>
            <input v-model="journalName" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">巻</label>
            <input v-model="volume" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">号</label>
            <input v-model="no" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">発行年</label>
            <input v-model="year" type="number" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">ページ範囲</label>
            <input v-model="pages" type="text" class="border p-2 w-full rounded-lg" />
          </div>
        </form>
      </div>

      <!-- ウェブサイト -->
      <div v-if="currentType === 'ウェブサイト'">
        <form @submit.prevent="formatCitation">
          <div class="mb-4">
            <label class="block text-sm font-medium">著者名</label>
            <input v-model="author" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">ページタイトル</label>
            <input v-model="webPageTitle" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">サイト名</label>
            <input v-model="websiteName" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">更新日</label>
            <input v-model="updateDate" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">URL</label>
            <input v-model="url" type="url" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">閲覧日</label>
            <input v-model="accessedDate" type="text" placeholder="ex) 2024-08-19"
              class="border p-2 w-full rounded-lg" />
          </div>
        </form>
      </div>

      <!-- 出力フォーマットの選択 -->
      <div class="mb-4">
        <label class="block text-sm font-medium">参考文献スタイル</label>
        <select v-model="citationStyle" class="border p-2 w-full rounded-lg">
          <option value="apa">APA</option>
          <option value="sist">SIST 02</option>
        </select>
      </div>

      <!-- 出力ボタン -->
      <div class="flex justify-center">
        <button @click="formatCitation" class="bg-blue-500 text-white py-2 px-8 rounded-lg text-center">
          出力！
        </button>
      </div>

      <!-- フォーマット結果表示 -->
      <div v-if="formattedCitation" class="mt-6">
        <h2 class="text-xl font-bold">Result:</h2>
        <p>{{ formattedCitation }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const referenceTypes = ['図書', '雑誌論文', 'ウェブサイト']
const currentType = ref('図書') // 初期状態は図書

// フォームデータ
const author = ref('')
const bookTitle = ref('')
const publisher = ref('')
const year = ref('')
const pages = ref('')
const paperTitle = ref('')
const journalName = ref('')
const volume = ref('')
const no = ref('')
const webPageTitle = ref('')
const websiteName = ref('')
const updateDate = ref('')
const url = ref('')
const accessedDate = ref('')

// スタイル選択
const citationStyle = ref('apa')
const formattedCitation = ref('')

// フォーマットする関数
const formatCitation = () => {
  if (citationStyle.value === 'apa') {
    if (currentType.value === '図書') {
      formattedCitation.value = `${author.value}(${year.value}) . 『${bookTitle.value}』. ${publisher.value}.`
    } else if (currentType.value === '雑誌論文') {
      formattedCitation.value = `${author.value}(${year.value}) . 「${paperTitle.value}」 『${journalName.value}』 ${volume.value}巻 , ${no.value}号 , pp.${pages.value} .`
    } else if (currentType.value === 'ウェブサイト') {
      formattedCitation.value = `${author.value}(${year.value}) . 「${webPageTitle.value}」 . ${websiteName.value} . ${url.value} , (参照：${accessedDate.value}) .`
    }
  } else if (citationStyle.value === 'sist') {
    // SISTスタイル処理
    // ...
  }
}
</script>

<style>
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {

  0%,
  100% {
    transform: rotate(0)
  }

  20%,
  60% {
    transform: rotate(-25deg)
  }

  40%,
  80% {
    transform: rotate(10deg)
  }
}

@media (max-width:500px) {
  .github-corner:hover .octo-arm {
    animation: none
  }

  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }
}
</style>
