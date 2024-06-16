<script setup lang="ts">
  interface SheetData {
    values: string[][];
  }

  const headers = ref<string[][]>([]);
  const result = ref<string[][]>([]);
  const isLoading = ref(true);

  // 從 Google Sheet 獲取數據並更新頁面
  async function fetchData() {
    isLoading.value = true;
    // 獲取 Google Sheet 數據
    const { data } = await allRows();
    // 將獲取的數據轉換為 SheetData 類型
    const sheetData = data.value as SheetData;

    // 將表格標題行賦值給 headers
    headers.value = [sheetData.values[0], sheetData.values[1]];
    // 使用 filter 方法過濾掉沒有庫存和價格的列
    const filteredData = sheetData.values.filter((row: string[]) => {
      if (row.filter((cell: string) => cell !== "").length <= 2) {
        return false;
      }
      return true;
    });

    // 將過濾後的數據賦值給 result,並刪除第一行標題行
    result.value = [...filteredData];
    result.value.splice(0, 2);
    isLoading.value = false;
  }

  fetchData();
</script>

<template>
  <div>
    <h1>價格調整中心</h1>
    <button @click="fetchData" :disabled="isLoading">
      {{ isLoading ? "加載中..." : "更新數據" }}
    </button>
    <table v-if="!isLoading">
      <thead>
        <tr v-for="(headerRow, rowIndex) in headers" :key="rowIndex">
          <th v-for="header in headerRow" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in result" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="loading">加載中...</p>
  </div>
</template>

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  }

  h1 {
    text-align: center;
    margin: 20px 0;
    color: #333;
  }

  button {
    display: block;
    margin: 0 auto 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #000000;
    color: #ffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button:hover {
    background-color: #c9c9c9;
    color: #000000;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .loading {
    text-align: center;
    font-size: 24px;
    color: #666;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 10px 30px;
    border-radius: 8px;
    overflow: hidden;
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #e8e8e8;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
  }

  tr:nth-child(-n + 4) {
    background-color: #f2f2f2;
  }

  tr:nth-child(n + 5) {
    background-color: #ffffff;
  }

  tr:nth-child(n + 5):hover {
    background-color: #e0e0e0;
  }
</style>
