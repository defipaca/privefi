// Math utilities
export class MathUtils {
  static roundToDecimals(value: number, decimals: number): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  static calculateAPY(principal: number, finalAmount: number, days: number): number {
    const rate = (finalAmount / principal) - 1;
    return Math.pow(1 + rate, 365 / days) - 1;
  }

  static calculateCompoundInterest(principal: number, rate: number, periods: number): number {
    return principal * Math.pow(1 + rate, periods);
  }

  static percentageOf(value: number, percentage: number): number {
    return value * (percentage / 100);
  }
}

// Time utilities
export class TimeUtils {
  static daysBetween(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  static parseDate(dateString: string): Date {
    return new Date(dateString);
  }

  static isBusinessDay(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Not Sunday (0) or Saturday (6)
  }

  static getNextBusinessDay(date: Date): Date {
    let nextDay = new Date(date);
    do {
      nextDay = this.addDays(nextDay, 1);
    } while (!this.isBusinessDay(nextDay));
    return nextDay;
  }
}

// ID generation utilities
export class IDUtils {
  static generateId(prefix: string = ''): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 9);
    return prefix ? `${prefix}_${timestamp}_${random}` : `${timestamp}_${random}`;
  }

  static generateVaultId(): string {
    return this.generateId('vault');
  }

  static generateTransactionId(): string {
    return this.generateId('tx');
  }

  static generateInvestorId(address: string): string {
    return `investor_${address.toLowerCase()}`;
  }

  static generatePositionId(vaultId: string, investorId: string): string {
    return `${vaultId}_${investorId}`;
  }
}

// Validation utilities
export class ValidationUtils {
  static isValidAddress(address: string): boolean {
    // Basic validation - in real implementation would check format
    return address && address.length > 0 && typeof address === 'string';
  }

  static isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && value > 0 && !isNaN(value);
  }

  static isValidPercentage(value: number): boolean {
    return typeof value === 'number' && value >= 0 && value <= 1 && !isNaN(value);
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Format utilities
export class FormatUtils {
  static formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  static formatPercentage(value: number, decimals: number = 2): string {
    return `${(value * 100).toFixed(decimals)}%`;
  }

  static formatNumber(value: number, decimals: number = 2): string {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  static formatAddress(address: string, startChars: number = 6, endChars: number = 4): string {
    if (address.length <= startChars + endChars) {
      return address;
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  }
}

export default {
  MathUtils,
  TimeUtils,
  IDUtils,
  ValidationUtils,
  FormatUtils
};