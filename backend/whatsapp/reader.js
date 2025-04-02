const fs = require('fs');
const path = require('path');

const basePath = path.resolve(process.cwd(), 'backend/whatsapp');

const qrPath = path.join(basePath, 'qr.json');
const statusPath = path.join(basePath, 'status.json');
const accountPath = path.join(basePath, 'account.json');

function readConnectionStatus() {
  if (fs.existsSync(statusPath)) {
    const { connected } = JSON.parse(fs.readFileSync(statusPath, 'utf-8'));
    return connected;
  }
  return false;
}

function readQrCode() {
  if (fs.existsSync(qrPath)) {
    const { qr } = JSON.parse(fs.readFileSync(qrPath, 'utf-8'));
    return qr;
  }
  return null;
}

function readAccountInfo() {
  if (fs.existsSync(accountPath)) {
    return JSON.parse(fs.readFileSync(accountPath, 'utf-8'));
  }
  return null;
}

module.exports = {
  readConnectionStatus,
  readQrCode,
  readAccountInfo,
};
