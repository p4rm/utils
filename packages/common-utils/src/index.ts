export default class CommonUtils {
  static underscoreToCamelCase(input: string): string {
    input = input.charAt(0).toUpperCase() + input.substr(1);
    input = input.replace(/_(.)/g, (match, letter) => {
      return ` ${letter.toUpperCase()}`;
    });
    return input.replace('_', ' ');
  }

  static hasDuplicates(a: string[]): boolean {
    for (let i = 0; i <= a.length; i++) {
      for (let j = i; j <= a.length; j++) {
        if (i != j && a[i] == a[j]) {
          return true;
        }
      }
    }
    return false;
  }

  static findDuplicates(arr: string[]): string[] {
    const sortedArray = arr.slice().sort(); // You can define the comparing function here.
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    const results = [];
    for (let i = 0; i < sortedArray.length - 1; i++) {
      if (sortedArray[i + 1] === sortedArray[i]) {
        results.push(sortedArray[i]);
      }
    }
    return results;
  }

  static flatToHierarchy(flat: any[]): any[] {
    const roots: any[] = []; // things without parent
    const all: any = {};

    flat.forEach((item: any) => {
      all[item.id] = item;
    });

    // connect children to its parent, and split roots apart
    for (const key of Object.keys(all)) {
      const item = all[key];
      if (!item.parent) {
        roots.push(item);
      } else if (item.parent in all) {
        const p = all[item.parent];
        if (!('children' in p)) p.children = [];
        p.children.push(item);
      }
    }

    // done!
    return roots;
  }
}
