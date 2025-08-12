import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';

// Storage Service
export class StorageService {
  private dataDir: string;

  constructor(dataDir: string = './data') {
    this.dataDir = dataDir;
    this.ensureDir();
  }

  private ensureDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  save(key: string, data: any): void {
    const filePath = path.join(this.dataDir, `${key}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  load<T>(key: string): T | null {
    try {
      const filePath = path.join(this.dataDir, `${key}.json`);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  exists(key: string): boolean {
    const filePath = path.join(this.dataDir, `${key}.json`);
    return fs.existsSync(filePath);
  }

  delete(key: string): boolean {
    try {
      const filePath = path.join(this.dataDir, `${key}.json`);
      fs.unlinkSync(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

// CSV Service
export class CSVService {
  static arrayToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }

  static saveCSV(filename: string, data: any[], outputDir: string = './exports'): void {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const csv = this.arrayToCSV(data);
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, csv);
  }
}

// PDF Service
export class PDFService {
  static async htmlToPDF(html: string, outputPath: string): Promise<void> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    await browser.close();
  }

  static generateStatementHTML(data: {
    investor: string;
    vaultName: string;
    period: string;
    shares: number;
    payout: number;
    transactions: any[];
  }): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Investment Statement</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; }
          .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .table th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>PrivéFi Investment Statement</h1>
          <p>Period: ${data.period}</p>
        </div>
        
        <div class="section">
          <h2>Account Information</h2>
          <p><strong>Investor:</strong> ${data.investor}</p>
          <p><strong>Vault:</strong> ${data.vaultName}</p>
          <p><strong>Shares:</strong> ${data.shares}</p>
          <p><strong>Payout:</strong> $${data.payout.toFixed(2)}</p>
        </div>
        
        <div class="section">
          <h2>Transaction History</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Shares</th>
              </tr>
            </thead>
            <tbody>
              ${data.transactions.map(tx => `
                <tr>
                  <td>${new Date(tx.timestamp).toLocaleDateString()}</td>
                  <td>${tx.type}</td>
                  <td>$${tx.amount.toFixed(2)}</td>
                  <td>${tx.shares || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;
  }
}

// Scheduler Service
export class SchedulerService {
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  schedule(name: string, callback: () => void, intervalMs: number): void {
    this.unschedule(name); // Clear existing
    const interval = setInterval(callback, intervalMs);
    this.intervals.set(name, interval);
  }

  unschedule(name: string): void {
    const interval = this.intervals.get(name);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(name);
    }
  }

  unscheduleAll(): void {
    for (const [name] of this.intervals) {
      this.unschedule(name);
    }
  }
}

// Logger Service
export class LoggerService {
  private logFile: string;

  constructor(logFile: string = './logs/app.log') {
    this.logFile = logFile;
    this.ensureLogDir();
  }

  private ensureLogDir(): void {
    const dir = path.dirname(this.logFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private log(level: string, message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data
    };

    const logLine = JSON.stringify(logEntry) + '\n';
    fs.appendFileSync(this.logFile, logLine);
    
    // Also log to console
    console.log(`[${timestamp}] ${level}: ${message}`, data || '');
  }

  info(message: string, data?: any): void {
    this.log('INFO', message, data);
  }

  error(message: string, data?: any): void {
    this.log('ERROR', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('WARN', message, data);
  }

  debug(message: string, data?: any): void {
    this.log('DEBUG', message, data);
  }
}

export default {
  StorageService,
  CSVService,
  PDFService,
  SchedulerService,
  LoggerService
};