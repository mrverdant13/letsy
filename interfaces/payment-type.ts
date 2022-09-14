export enum IPaymentType {
  single = 'single',
  uniformSeries = 'uniform-series',
}

export namespace IPaymentType {
  export const VALUES: (IPaymentType[]) = Object.values(IPaymentType) as IPaymentType[];

  export function parse(s: string): (IPaymentType | null) {
    if (!s) return null;
    const maybeType = VALUES.find(v => v === s);
    return maybeType || null;
  }

  export function getLabel(type: IPaymentType): string {
    switch (type) {
      case IPaymentType.single: {
        return 'Single payment';
      }
      case IPaymentType.uniformSeries: {
        return 'Uniform series payment';
      }
    }
  }

}