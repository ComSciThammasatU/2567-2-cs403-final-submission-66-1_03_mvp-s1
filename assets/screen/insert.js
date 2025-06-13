import { StatusBar } from 'expo-status-bar';
export default function insert() {
    return (
      <View style={styles.container}>
        
        <Button color = "red" title = "เริ่มขาย" onPress ={() => console.log("sell")} />
        
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://media.discordapp.net/attachments/634729991145390095/1356246930765905980/111-.drawio.png?ex=67ebdee2&is=67ea8d62&hm=9bc8c6914b14f562a1c4a27a1f30faa71b773690ffa00f96db9f0d123bc9cffe&=&format=webp&quality=lossless&width=826&height=782',
          }}
          onPress ={() => console.log("button")}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  const editCustumer = async (Custumer) => {
    try {
        const pool = await poolPromise
        const request = pool.request()
        request.input('name', sql.VarChar, Custumer.name)
        request.input('number', sql.VarChar, Custumer.number)
        request.input('address', sql.VarChar, Custumer.address)
        await request.query('INSERT INTO users (name, number, address) VALUES (@name, @email, @password)')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

const edit = async (Custumer) => {
    try {
        const pool = await poolPromise
        const request = pool.request()
        request.input('name', sql.VarChar, Custumer.name)
        request.input('number', sql.VarChar, Custumer.number)
        request.input('address', sql.VarChar, Custumer.address)
        await request.query('INSERT INTO users (name, number, address) VALUES (@name, @email, @password)')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tinyLogo: {
      width: 150,
      height: 150,
    },
  });