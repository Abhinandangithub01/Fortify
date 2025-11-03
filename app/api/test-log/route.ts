import { NextResponse } from 'next/server';

export async function GET() {
  // Try multiple logging methods
  console.log('TEST LOG 1: console.log');
  console.error('TEST LOG 2: console.error');
  console.warn('TEST LOG 3: console.warn');
  console.info('TEST LOG 4: console.info');
  
  // Also try process.stdout/stderr
  process.stdout.write('TEST LOG 5: stdout.write\n');
  process.stderr.write('TEST LOG 6: stderr.write\n');
  
  return NextResponse.json({
    message: 'Test log endpoint - check CloudWatch for logs',
    timestamp: new Date().toISOString()
  });
}
