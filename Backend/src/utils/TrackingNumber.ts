import { PrismaClient } from "../generated/prisma";

interface TrackingNumberConfig {
    prefix: string;
    includeDate?: boolean;
    serialLength?: number;
    date?: string;
}

const generateTrackingNumber = async (
    prisma: PrismaClient,
    config: TrackingNumberConfig
): Promise<string> => {
    const { prefix, includeDate = true, serialLength = 6 } = config;
    
    // Format date as DDMMYYYY
    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}${month}${year}`;
    };

    const datePart = includeDate ? formatDate(new Date()) : '';

    // Atomically increment the serial number
    const counter = await prisma.tracking_counter.upsert({
        where: { id: 'trackingNumber' },
        update: { seq: { increment: 1 } },
        create: { id: 'trackingNumber', seq: 1 },
        select: { seq: true },
    });

    // Format serial with leading zeros
    const serial = counter.seq.toString().padStart(serialLength, '0');

    // Combine parts
    const base = `${prefix}${includeDate ? '-' + datePart : ''}-${serial}`;

    // Calculate check digit
    const checkDigit = calculateCheckDigit(base.replace(/-/g, ''));

    return `${base}-${checkDigit}`;
};

const calculateCheckDigit = (input: string): number => {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const digit = parseInt(input[i], 10) || 0;
        sum += i % 2 === 0 ? digit * 1 : digit * 3;
    }
    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
};

export { generateTrackingNumber, calculateCheckDigit };
