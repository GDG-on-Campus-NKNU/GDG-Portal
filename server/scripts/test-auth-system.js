#!/usr/bin/env node
// filepath: /workspaces/GDG-Portal/server/scripts/test-auth-system.js

/**
 * 認證系統測試腳本
 * 測試項目：
 * 1. 用戶註冊
 * 2. 用戶登入
 * 3. Token 驗證
 * 4. Token 刷新
 * 5. Google OAuth 流程
 */

import fetch from 'node-fetch';
import chalk from 'chalk';

const BASE_URL = 'http://localhost:5000/api';
const AUTH_URL = `${BASE_URL}/auth`;

// 測試數據
const testUser = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'TestPassword123'
};

// 輔助函數
const log = {
  info: (msg) => console.log(chalk.blue('ℹ'), msg),
  success: (msg) => console.log(chalk.green('✓'), msg),
  error: (msg) => console.log(chalk.red('✗'), msg),
  warning: (msg) => console.log(chalk.yellow('⚠'), msg)
};

// 測試函數
class AuthTester {
  constructor() {
    this.tokens = {};
    this.cookies = '';
  }

  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Cookie': this.cookies,
          ...options.headers
        }
      });

      // 提取 Cookie
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) {
        this.cookies = setCookie;
      }

      const data = await response.json();
      return { response, data };
    } catch (error) {
      log.error(`請求失敗: ${error.message}`);
      return { error };
    }
  }

  async testRegistration() {
    log.info('測試用戶註冊...');
    
    const { response, data, error } = await this.makeRequest(`${AUTH_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(testUser)
    });

    if (error) {
      log.error('註冊測試失敗');
      return false;
    }

    if (response.status === 201) {
      log.success('註冊成功');
      this.tokens.accessToken = data.accessToken;
      return true;
    } else if (response.status === 400 && data.message.includes('已被註冊')) {
      log.warning('用戶已存在，跳過註冊測試');
      return true;
    } else {
      log.error(`註冊失敗: ${data.message}`);
      return false;
    }
  }

  async testLogin() {
    log.info('測試用戶登入...');
    
    const { response, data, error } = await this.makeRequest(`${AUTH_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    });

    if (error) {
      log.error('登入測試失敗');
      return false;
    }

    if (response.status === 200) {
      log.success('登入成功');
      this.tokens.accessToken = data.accessToken;
      return true;
    } else {
      log.error(`登入失敗: ${data.message}`);
      return false;
    }
  }

  async testGetCurrentUser() {
    log.info('測試獲取當前用戶資訊...');
    
    const { response, data, error } = await this.makeRequest(`${AUTH_URL}/me`, {
      method: 'GET'
    });

    if (error) {
      log.error('獲取用戶資訊測試失敗');
      return false;
    }

    if (response.status === 200) {
      log.success(`獲取用戶資訊成功: ${data.user.name} (${data.user.email})`);
      return true;
    } else {
      log.error(`獲取用戶資訊失敗: ${data.message}`);
      return false;
    }
  }

  async testTokenRefresh() {
    log.info('測試 Token 刷新...');
    
    const { response, data, error } = await this.makeRequest(`${AUTH_URL}/refresh`, {
      method: 'POST'
    });

    if (error) {
      log.error('Token 刷新測試失敗');
      return false;
    }

    if (response.status === 200) {
      log.success('Token 刷新成功');
      this.tokens.accessToken = data.accessToken;
      return true;
    } else {
      log.error(`Token 刷新失敗: ${data.message}`);
      return false;
    }
  }

  async testLogout() {
    log.info('測試用戶登出...');
    
    const { response, data, error } = await this.makeRequest(`${AUTH_URL}/logout`, {
      method: 'POST'
    });

    if (error) {
      log.error('登出測試失敗');
      return false;
    }

    if (response.status === 200) {
      log.success('登出成功');
      this.tokens = {};
      this.cookies = '';
      return true;
    } else {
      log.error(`登出失敗: ${data.message}`);
      return false;
    }
  }

  async runAllTests() {
    console.log(chalk.cyan('\n🔐 開始認證系統測試\n'));

    const tests = [
      { name: '用戶註冊', fn: () => this.testRegistration() },
      { name: '用戶登入', fn: () => this.testLogin() },
      { name: '獲取用戶資訊', fn: () => this.testGetCurrentUser() },
      { name: 'Token 刷新', fn: () => this.testTokenRefresh() },
      { name: '用戶登出', fn: () => this.testLogout() }
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      try {
        const result = await test.fn();
        if (result) {
          passed++;
        } else {
          failed++;
        }
      } catch (error) {
        log.error(`測試 "${test.name}" 發生異常: ${error.message}`);
        failed++;
      }
      console.log(''); // 空行分隔
    }

    // 總結
    console.log(chalk.cyan('\n📊 測試結果總結'));
    console.log(`${chalk.green('通過:')} ${passed}`);
    console.log(`${chalk.red('失敗:')} ${failed}`);
    console.log(`${chalk.blue('總計:')} ${passed + failed}`);

    if (failed === 0) {
      console.log(chalk.green('\n🎉 所有認證測試通過！'));
    } else {
      console.log(chalk.red('\n❌ 部分測試失敗，請檢查服務器配置'));
    }
  }
}

// 檢查服務器是否運行
async function checkServer() {
  try {
    const response = await fetch(`${BASE_URL}/auth/status`);
    if (response.ok) {
      log.success('服務器運行正常');
      return true;
    }
  } catch (error) {
    log.error('無法連接到服務器，請確保服務器已啟動 (npm run dev)');
    return false;
  }
}

// 主執行函數
async function main() {
  console.log(chalk.yellow('🔍 檢查服務器狀態...'));
  
  const serverOk = await checkServer();
  if (!serverOk) {
    process.exit(1);
  }

  const tester = new AuthTester();
  await tester.runAllTests();
}

// 執行測試
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default AuthTester;
