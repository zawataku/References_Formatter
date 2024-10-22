<template>
  <main class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-200">
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

      <!-- 図書フォーム -->
      <div v-if="currentType === '図書'">
        <form @submit.prevent="formatCitation">
          <div class="mb-4">
            <label class="block text-sm font-medium">著者名</label>
            <input v-model="author" type="text" class="border p-2 w-full rounded-lg" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">書名</label>
            <input v-model="bookTitle" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">出版社</label>
            <input v-model="publisher" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">出版年</label>
            <input v-model="year" type="number" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">総ページ数</label>
            <input v-model="pages" type="number" class="border p-2 w-full" />
          </div>
        </form>
      </div>

      <!-- 雑誌論文フォーム -->
      <div v-if="currentType === '雑誌論文'">
        <form @submit.prevent="formatCitation">
          <div class="mb-4">
            <label class="block text-sm font-medium">著者名</label>
            <input v-model="author" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">論文タイトル</label>
            <input v-model="paperTitle" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">雑誌名</label>
            <input v-model="journalName" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">巻号</label>
            <input v-model="volume" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">発行年</label>
            <input v-model="year" type="number" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">ページ範囲</label>
            <input v-model="pages" type="text" class="border p-2 w-full" />
          </div>
        </form>
      </div>

      <!-- ウェブサイトフォーム -->
      <div v-if="currentType === 'ウェブサイト'">
        <form @submit.prevent="formatCitation">
          <div class="mb-4">
            <label class="block text-sm font-medium">著者名</label>
            <input v-model="author" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">ページタイトル</label>
            <input v-model="webPageTitle" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">サイト名</label>
            <input v-model="websiteName" type="text" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">URL</label>
            <input v-model="url" type="url" class="border p-2 w-full" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium">閲覧日</label>
            <input v-model="accessedDate" type="date" class="border p-2 w-full" />
          </div>
        </form>
      </div>

      <!-- 出力フォーマットの選択 -->
      <div class="mb-4">
        <label class="block text-sm font-medium">参考文献スタイル</label>
        <select v-model="citationStyle" class="border p-2 w-full">
          <option value="apa">APA</option>
          <option value="ieee">IEEE</option>
          <option value="sist">SIST</option>
        </select>
      </div>

      <button @click="formatCitation" class="bg-blue-500 text-white p-2 rounded mx-auto">フォーマットを表示</button>

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
const webPageTitle = ref('')
const websiteName = ref('')
const url = ref('')
const accessedDate = ref('')

// スタイル選択
const citationStyle = ref('apa')
const formattedCitation = ref('')

// フォーマットする関数
const formatCitation = () => {
  if (citationStyle.value === 'apa') {
    if (currentType.value === '図書') {
      formattedCitation.value = `${author.value} (${year.value}). *${bookTitle.value}*. ${publisher.value}.`
    } else if (currentType.value === '雑誌論文') {
      formattedCitation.value = `${author.value} (${year.value}). "${paperTitle.value}", *${journalName.value}*, vol. ${volume.value}, pp. ${pages.value}.`
    } else if (currentType.value === 'ウェブサイト') {
      formattedCitation.value = `${author.value} (${accessedDate.value}). "${webPageTitle.value}". ${websiteName.value}. Retrieved from ${url.value}`
    }
  } else if (citationStyle.value === 'ieee') {
    // IEEEスタイル処理
    // ...
  } else if (citationStyle.value === 'sist') {
    // SISTスタイル処理
    // ...
  }
}
</script>